import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MonitoringComponent({setAlertCount, setNotification_value}:{setAlertCount:Dispatch<SetStateAction<number>>, setNotification_value:Dispatch<SetStateAction<number>>}) {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

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

      if ((data.status === "alert" && !hasAlerted) || data.person_count==0) {
        setAlertCount((prev) => prev + 1);
        alerts++;
        setHasAlerted(true);
        if(data.person_count>1){
          // alert(`there are more number of students in the frame`)
          setNotification_value(2);
        }else if(data.person_count==0){
          setNotification_value(1);
        }else{
          // alert(`mobile phone detected ! \n warning`)
          setNotification_value(3);
        }

        // Allow next alert after 10s
        setTimeout(() => setHasAlerted(false), 10000);
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
