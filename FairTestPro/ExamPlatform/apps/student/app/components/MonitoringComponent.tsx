import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MonitoringComponent() {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [no_of_alert, setNo_ofalert] = useState(0);

  const [hasAlerted, setHasAlerted] = useState(false);

const captureAndSend = async () => {
  let alerts = 0;
  if (!isWebcamReady || !webcamRef.current) return;

  const imageSrc = webcamRef.current.getScreenshot();

  if (imageSrc && imageSrc.startsWith("data:image")) {
    try {
      const { data } = await axios.post("http://localhost:8000/analyze-frame", {
        image: imageSrc,
      });
      console.log("Response from YOLO:", data);

      if (data.status === "alert" && !hasAlerted) {
        setNo_ofalert((prev) => prev + 1);
        alerts++;
        setHasAlerted(true);
        if(data.person_count>1){
          alert(`there are more number of students in the frame`)
        }else{
          alert(`mobile phone detected ! \n warning`)
        }

        // Allow next alert after 10s
        setTimeout(() => setHasAlerted(false), 100000);
      }
    } catch (e) {
      console.error("Error sending frame:", e);
    }
  }
};


  useEffect(() => {
    const interval = setInterval(() => {
      captureAndSend();
    }, 2000);

    return () => clearInterval(interval);
  }, [isWebcamReady]);

  return (
    <div className="flex text-center items-center justify-center">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={100}
        height={100}
        onUserMedia={() => {
          console.log("Webcam is ready");
          setIsWebcamReady(true);
        }}
        onUserMediaError={(err) => {
          console.error("Webcam error:", err);
        }}
      />
    </div>
  );
}
