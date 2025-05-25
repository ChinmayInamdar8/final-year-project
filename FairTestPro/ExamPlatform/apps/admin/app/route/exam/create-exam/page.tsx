"use client"

import { useState } from "react";
import { Heading } from "../../../components/Heading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setExamId } from "../../../store/slices/ExamId";


export default function CreateExam(){
    const [name, setName] = useState("");
    const [no_of_question, setNo_of_question] = useState("");
    const [duration, setDuration] = useState("");
    const [result, setResult] = useState<boolean>(true);
    const router = useRouter();
    const dispach = useDispatch();

    const onHandler = async (e:React.FormEvent)=>{
        e.preventDefault();

        try{
            const res = await axios.post("/api/exam/create-exam", {
                name,
                no_of_question,
                duration,
                result
            })


            const data = res.data;
            alert("exam id is " + data.exam_id);

            if(data.exam_id){
                dispach(setExamId(data.exam_id))
                router.push("/route/exam/add-question");
            }
            
        }catch(e){
            alert("something went wrong");
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center  bg-slate-200 overflow-hidden">
            <form 
            onSubmit={onHandler}
            className="bg-white w-2/3 max-h-[80vh] py-6 rounded shadow-lg overflow-y-auto px-4 flex flex-col justify-center items-center mt-6">
            <p className="pt-4"></p>
                <Heading heading="Create Exam"></Heading>
                <div className="w-full px-52 my-4">
                    <label htmlFor="name" className="block mb-1">Enter text name:</label>
                    <input type="text" name="name" id="name" className="border-2 border-sky-600 py-1 text-center rounded w-full outline-none ml-5"onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="w-full px-52 my-4">
                    <label htmlFor="no_of" className="block mb-1">No of questions:</label>
                    <input type="number" name="no_of" id="no_of" className="border-2 border-sky-600 py-1 text-center rounded w-32 outline-none ml-5"onChange={(e)=>{setNo_of_question(e.target.value)}}/>
                </div>
                <div className="w-full px-52 my-4">
                    <label htmlFor="duration" className="block mb-1">Duration (in mins):</label>
                    <input type="number" name="duration" id="duration" className="border-2 border-sky-600 py-1 text-center rounded w-32 outline-none ml-5" onChange={(e)=>{setDuration(e.target.value)}}/>
                </div>
                <div className="w-full px-52 my-4">
                    <label htmlFor="result" className="block mb-1">does students can see result of this exam ?</label>
                    <select name="result" id="result" className="border-2 border-sky-600 py-1 text-center rounded w-full outline-none ml-5" onChange={(e)=>{setResult(e.target.value==="true")}}>
                        <option value="NA">Select Option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="w-full px-52 m my-4">

                <button type="submit" className="py-1 text-center w-full text-white bg-green-600 rounded">Create Exam</button>
                </div>
            </form>
        </div>
    )
}