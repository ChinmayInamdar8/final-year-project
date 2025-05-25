"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"

export function AppBar(){
    const router = useRouter();
    return (
        <div className="bg-white h-12 w-4/5 flex justify-between items-center shadow-2xl sticky top-4 border  border-slate-600 rounded-3xl px-4 text-slate-700">
            <div className="text-xl font-medium text-sky-600">
                FairTestPro.
            </div>
            <div>
                <button className="hover:text-black" onClick={()=>{router.push("/route/exam/create-exam")}}>Create Exam</button>
            </div>
            <div>
                <button className="hover:text-black"
                onClick={()=>{router.push('/route/exam/your-exams')}}
                >Your Exams</button>
            </div>
            <div>
                <button className="border border-sky-600 text-sky-600 rounded-3xl py-1 px-5" onClick={()=>{router.push("/route/signin")}}>SignIn</button>
            </div>
            <div>
                <button className="text-red-600 hover:text-red-800 border border-red-600 rounded-3xl py-1 px-2" onClick={()=>{signOut()}}>SignOut</button>
            </div>
        </div>
    )
}