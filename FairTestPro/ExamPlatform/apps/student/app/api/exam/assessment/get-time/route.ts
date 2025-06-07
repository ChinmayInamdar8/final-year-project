import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const {exam_id} = await req.json();
    if(exam_id){
        const data = await prisma.mcq_exam.findFirst({
            where:{
                Exam_id:exam_id
            }
        })
        
        if(data){
            return NextResponse.json({duration:data.duration});
        }
        
        return NextResponse.json({message:"no exam is present"});
    };

    return NextResponse.json({message:"exam id is not present"});    
    
}