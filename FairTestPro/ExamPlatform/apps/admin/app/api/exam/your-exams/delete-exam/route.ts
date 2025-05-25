import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const {exam_id} = await req.json();

    if(!exam_id){
        return NextResponse.json({message:"the exam_id is not in the request"});
    }

    try{
        await prisma.question.deleteMany({
            where:{
                exam_id:exam_id
            }
        });

        const data = await prisma.mcq_exam.delete({
            where:{
                Exam_id:exam_id
            }
        });

        if(data){
            return NextResponse.json({message:"Deleted!"});
        }

        return NextResponse.json({message:"database Error"})
    }catch(e){
        return NextResponse.json({message:"there is database problem"})
    }

}