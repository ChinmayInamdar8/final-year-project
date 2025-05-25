"use client"

import { useEffect, useState } from "react";
import { ExamBoard } from "../../components/ExamBoard";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function give_assessment() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [examAvailable, setExamAvailable] = useState(false);
  const [no_of_questions, setNo_of_questions] = useState(0); 
  const exam_id = searchParams.get("id");

  useEffect(() => {
    axios.post("/api/exam/assessment/check", { exam_id })
      .then((res) => {
        if (res.data.message === "available") {
          setExamAvailable(true);
          console.log(res.data);
          setNo_of_questions(res.data.no_of_questions); 
        } else {
          alert(res.data.message);
        }
        setLoading(false);
      });
  }, [exam_id]);

  const startExam = async () => {
    const element = document.documentElement;
    if (element.requestFullscreen) await element.requestFullscreen();
    setHasStarted(true);
  };

  if(loading){
    return (
      <div className="w-screen h-screen flex items-center justify-center text-3xl font-bold text-sky-600">
        Loading ...
      </div>
    )
  }

  if (examAvailable) {
    return (
      <div>
        {!hasStarted ? (
          <div className="w-screen h-screen flex items-center justify-center">
            <button
              onClick={startExam}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Start Exam
            </button>
          </div>
        ) : (
          <ExamBoard no_of_questions={no_of_questions} exam_id={exam_id || ""}/>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center mt-14">
        <div className="text-2xl text-red-600 font-bold px-64">
          There is no exam available with this link. Check the link once again, and if the issue persists, ask the organizer about the link.
        </div>
      </div>
    );
  }
}
