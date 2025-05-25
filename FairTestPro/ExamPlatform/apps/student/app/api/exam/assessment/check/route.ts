import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const {exam_id} = await req.json();

    if(exam_id){
        try{
            const exam = await prisma.mcq_exam.findFirst({
                where:{
                    Exam_id:exam_id
                }
            })

            if(exam){
                return NextResponse.json({message:"available", no_of_questions : exam.no_of_questions})
            }else{
                
                return NextResponse.json({message:"not available"})
            }
        }catch(e:any){
            
            console.log(e);
            return NextResponse.json({message:"not available through catch"})
        }
    }else{
        
        return NextResponse.json({message:"there is some problem in exam id"})
    }
}