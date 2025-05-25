import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface questionType{
    id: number;
    exam_id: string;
    question: string;
    question_no: number;
    options: string[];
    correctOption: number;
}

export async function POST(req:Request){
    const {questions}:{questions:questionType[]}= await req.json();

    console.log(questions);

    if(questions){
        try{
            for(const q of questions){
                await prisma.question.update({
                    where:{id:q.id},
                    data:{
                        question:q.question,
                        options:q.options,
                        correctOption:q.correctOption
                    }
                })
            }

            return NextResponse.json({message:"done"});
        }catch(e){
            return NextResponse.json({message:"there is some prisma problem"});
        }
    }
    return NextResponse.json({message:"the questions are not present"});


    
}