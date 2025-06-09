"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function start(){
    const router = useRouter();
    const [exam_id, setExam_id] = useState("");
    return (
        <div className="w-screen h-screen bg-slate-100 flex flex-col justify-center items-center">
            <h1 className="mb-7 text-2xl font-medium">Start Exam</h1>
            <div className="w-1/2 h-1/2 bg-white rounded border border-sky-600 shadow-xl flex justify-center items-center">
            <div>
                <input type="text" name="exam_id" id="exam-id" placeholder="Exam ID" className="outline-none w-full py-2 px-7 border border-slate-600 rounded text-center" onChange={(e)=>{setExam_id(e.target.value)}}/>

                <button className="bg-sky-600 text-white text-xl rounded w-full py-2 text-center mt-7" onClick={()=>{
                    router.push(`/route/start-assessment?id=${exam_id}`)
                }}>Start</button>
            </div>
            </div>
        </div>
    )
}