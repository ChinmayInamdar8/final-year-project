import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const {ques_no, exam_id} = await req.json();
    
    if(ques_no && exam_id){
        try{
            const res = await prisma.question.findFirst({
                where:{
                    exam_id:exam_id,
                    question_no:ques_no
                }
            })

            console.log(res);
            if(res){
                return NextResponse.json({question:res.question, options:res.options});
            }else{
                return NextResponse.json({message:"problem1"});
            }
        }catch(e){
            return NextResponse.json({message:"problem2"});
        }
    }

    return NextResponse.json({message:"problem3"});
}