import React from "react";

export default function Examlayout({children}:{children:React.ReactNode}){
    return (
        <div>
            <div className="bg-sky-600 w-full h-10 text-white flex justify-between items-center">
            <div className="text-xl font-medium">
            FairTestPro.
            </div>
            <div className="text-xl font-medium">
            Exam DashBoard
            </div>
            <div className="text-xl font-medium">
            
            </div>
            </div>


            {/* main content */}
            <main>{children}</main>
        </div>
    )
}