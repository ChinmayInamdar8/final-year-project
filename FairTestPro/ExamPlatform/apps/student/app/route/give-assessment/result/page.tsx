"use client"
import { useSearchParams } from "next/navigation"


export default function Home(){
    const searchParams = useSearchParams();
    const marks = searchParams.get("m");
    return (
        <div className="w-full h-[92vh] flex justify-center items-center">
            <div className="text-2xl font-bold text-green-600">
                Your result is {marks}
            </div>
        </div>
    )
}