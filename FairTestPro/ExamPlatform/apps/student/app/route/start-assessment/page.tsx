"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function start_assessment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const exam_id = searchParams.get("id");
  const [email, setEmail] = useState("");

  // webcam stuff
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const [hasPermission, setHasPermission] = useState(false);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop()); // close stream after getting permission
      setHasPermission(true);
    } catch (err) {
      alert("Camera access is required to continue.");
      console.error(err);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please capture your image first.");
      return;
    }

    setLoading(true);
    try {
      const storedRes = await axios.post("/api/exam/get-image", { email });
      const storedImage = storedRes.data?.image.image;
      console.log(storedRes);

      if (!storedImage) {
        alert("No image is present in the database");
        setLoading(false);
        return;
      }

      const verifyRes = await axios.post(
        "http://localhost:8000/verify",
        {
          img1: storedImage,
          img2: image,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (verifyRes.data.verified) {
        const res = await axios.post("/api/exam/active-student", {
          image,
          email,
          exam_id,
        });

        if (res.data.message === "accepted") {
          window.localStorage.setItem("student_id", res.data.student_id);
          alert("You are being redirected to the assessment page");
          router.push(`/route/give-assessment?id=${exam_id}`);
        }
      } else {
        alert("Face verification failed. Please try again.");
      }
    } catch (e: any) {
      console.log(e);
      alert(e.response?.data?.error || "There was a problem starting the test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-7/12 bg-white rounded shadow-xl flex flex-col items-center py-10"
      >
        <p className="text-xl font-medium mt-4">
          Fill the information to start the Test
        </p>
        <div className="w-full px-20 mt-6">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Email ID"
            className="w-full border-2 border-sky-600 py-1 text-center rounded outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="w-full justify-center items-center flex flex-col mt-6 px-20">
            {!hasPermission ? (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={requestCameraAccess}
              >
                Give Camera Access
              </button>
            ) : !image ? (
              <>
                <Webcam
                  audio={false}
                  height={180}
                  screenshotFormat="image/jpeg"
                  width={250}
                  ref={webcamRef}
                  videoConstraints={{ facingMode: "user" }}
                  className="rounded shadow"
                />
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-1 mt-2 rounded w-full"
                  onClick={capture}
                >
                  Capture
                </button>
              </>
            ) : (
              <>
                <img
                  src={image}
                  alt="captured"
                  className="w-48 h-32 object-cover"
                />
                <button
                  type="button"
                  className="text-blue-500 underline mt-1"
                  onClick={() => setImage(null)}
                >
                  Capture again
                </button>
              </>
            )}
          </div>

          <div className="w-full px-28">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-1 text-center text-xl rounded mt-7 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-600 text-white"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
