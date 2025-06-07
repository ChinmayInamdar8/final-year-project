"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// wrap this inside a suspense tag to solve build issue. :)

interface Student{
        name: string;
        email: string;
}
interface resultType{
    id: number;
    exam_id: string;
    student_id: number;
    result_validity: boolean;
    marks: number;
    student:Student;
}


export default function view_result() {
  const searchParams = useSearchParams();
  const exam_id = searchParams.get("id");
  const [result, getResult] = useState<resultType[]>();
  console.log(result);
  useEffect(() => {
    axios.post<resultType[]>("/api/exam/your-exams/result", {
        exam_id,
      })
      .then((res) => {
        console.log("The res is ", res.data);
        getResult(res.data);
        console.log(result);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mb-32">
      <div className="bg-orange-300 rounded px-10 py-3 mt-10 flex flex-col justify-center items-center">
        <div className="text-3xl font-medium text-slate-600">Result</div>
        <p>{exam_id}</p>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Email ID 
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                marks
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                Valid
              </th>
            </tr>
          </thead>
          <tbody>
            {result?.map((res, key)=>(
                <TableRowResult result={res} key={key}></TableRowResult>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const TableRowResult = ({ result }: { result: resultType }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {result.student.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {result.student.email}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {result.marks}
      </td>
      <td className="px-6 py-4 text-center">
        {result.result_validity ? (
          <span className="text-green-600 font-semibold">Valid</span>
        ) : (
          <span className="text-red-600 font-semibold">Invalid</span>
        )}
      </td>
    </tr>
  );
};

