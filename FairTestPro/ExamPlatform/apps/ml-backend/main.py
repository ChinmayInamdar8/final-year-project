from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deepface import DeepFace
from ultralytics import YOLO
import base64
import cv2
import numpy as np

app = FastAPI()

# Load YOLOv8 model (nano version, fast and lightweight)
model = YOLO("yolov8m.pt")  # Change to yolov8s.pt if you want better accuracy

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VerifyRequest(BaseModel):
    img1: str
    img2: str

def base64_to_image(base64_str):
    try:
        header, encoded = base64_str.split(",", 1)
        image_data = base64.b64decode(encoded)
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Image decoding returned None")
        return img
    except Exception as e:
        print("Failed to decode image:", e)
        raise HTTPException(status_code=400, detail="Image decoding failed")

def detect_face_count(image):
    try:
        detector_backend = 'retinaface'  # you can also try mtcnn or opencv
        detections = DeepFace.extract_faces(img_path=image, detector_backend=detector_backend, enforce_detection=False)
        return len(detections)
    except Exception as e:
        print("Face detection error:", e)
        return 0

def detect_objects(image):
    try:
        results = model(image)[0]
        class_names = results.names
        boxes = results.boxes
        detected_classes = [class_names[int(cls)] for cls in boxes.cls]

        person_count = detected_classes.count("person")
        phone_detected = "cell phone" in detected_classes or "mobile phone" in detected_classes

        return {
            "person_count": person_count,
            "mobile_detected": phone_detected,
            "status": "alert" if person_count > 1 or phone_detected else "clear"
        }
    except Exception as e:
        print("Detection error:", e)
        raise HTTPException(status_code=500, detail="Object detection failed")

class FrameRequest(BaseModel):
    image: str  # base64 image string

@app.post("/analyze-frame")
def analyze_frame(req: FrameRequest):
    try:
        img = base64_to_image(req.image)
        result = detect_objects(img)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify")
async def verify_faces(req: VerifyRequest):
    try:
        img1 = base64_to_image(req.img1)
        img2 = base64_to_image(req.img2)

        face_count_1 = detect_face_count(img1)
        face_count_2 = detect_face_count(img2)

        print(f"Faces in img1: {face_count_1}")
        print(f"Faces in img2: {face_count_2}")

        if face_count_1 != 1 or face_count_2 != 1:
            print("Multiple or zero faces detected. Rejecting verification.")
            return {"verified": False, "reason": "Face count mismatch"}

        result = DeepFace.verify(img1_path=img1, img2_path=img2, enforce_detection=False)
        return {"verified": result["verified"]}

    except Exception as e:
        print("Exception during verification:", e)
        raise HTTPException(status_code=500, detail=str(e))

# .\venv\Scripts\activate
# uvicorn main:app --reload
