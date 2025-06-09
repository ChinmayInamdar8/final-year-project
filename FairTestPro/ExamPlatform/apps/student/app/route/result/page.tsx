"use client"

import axios from "axios";
import { useEffect, useState } from "react"

interface resultType{
    id: number;
    exam_id: string;
    student_id: number;
    result_validity: boolean;
    marks: number;
    exam:exam
}

interface exam{
        name: string;
    }; 

export default function result(){

    const [result, setResult] = useState<resultType[]>([]);

    useEffect(()=>{
        axios.post('/api/exam/view-result')
        .then((res)=>{
            console.log(res.data);
            setResult(res.data.result);
        })
    }, []);
    return (
        <div>
            <div className="text-center text-3xl font-medium mt-10">Your result</div>

            <div className="w-full h-[92vh flex flex-col items-center">

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
                validity
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
               marks
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((res, key)=>(<TableRowResult result={res} key={key}></TableRowResult>))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    )
}

const TableRowResult = ({ result }: { result: resultType }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {result.exam.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {result.exam_id}
      </td>
      <td className="px-6 py-4 text-center">
        {result.result_validity ? (
          <span className="text-green-600 font-semibold">Valid</span>
        ) : (
          <span className="text-red-600 font-semibold">Invalid</span>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {result.marks}
      </td>
    </tr>
  );
};