"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ExamType{
    name: string;
    id: number;
    date: Date;
    Exam_id: string;
    no_of_questions: number;
    duration: number;
    active: boolean;
    result_display: boolean;
}

 

export default function your_exams() {


    const [exams, setExams] = useState<ExamType[]>();

    useEffect(()=>{
        axios.get('/api/exam/your-exams')
        .then((res)=>{
            if(res.data.message==="done"){
                setExams(res.data.data);
            }
        })
    }, []);

    if(!exams){
        return (
            <div>
                There is no exam present
            </div>
        )
    }

  return (
    <div className="w-full h-[92vh flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Your Exams</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Exam Name
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Exam ID
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                No of Questions
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Delete
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                View Result
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                View live
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">

            {exams.map((exam, index)=>(
                <TableRow exam={exam} key={index}></TableRow>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}


const TableRow =({exam}:{exam:ExamType})=>{
  const router = useRouter();
    return (
        <tr className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-700 text-center ">{exam.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700 text-center ">{exam.Exam_id}</td>
              <td className="px-6 py-4 text-sm text-gray-700 text-center ">{exam.no_of_questions}</td>
              <td className="px-6 py-4 text-center">
                <button className="text-red-600 hover:underline"
                onClick={()=>{
                    axios.post("/api/exam/your-exams/delete-exam", {exam_id:exam.Exam_id})
                    .then((res)=>{
                        if(res.data.message==="Deleted!"){
                            Swal.fire({
                                title: "deleted !",
                                text: "Your exam is deleted!",
                                icon: "success"
                              }).then(()=>{
                                window.location.reload();
                              })


                        }else{
                            alert(res.data.message);
                        }
                    })
                  }}
                >Delete</button>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-600 hover:underline"
                onClick={()=>router.push(`/route/exam/edit-exam?id=${exam.Exam_id}`)}
                >Edit</button>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-green-600 hover:underline"
                >view result</button>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-red-600 hover:underline"
                >view live</button>
              </td>
            </tr>
    )
}
