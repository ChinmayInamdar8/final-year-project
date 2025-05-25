import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

interface questionType {
    exam_id:string 
    question: string
    options: string[]
    correctOption: number
    question_no: number

  }

const prisma = new PrismaClient();

export async function POST(req:Request){
    const {questions}:{questions:questionType[]} = await req.json();
    console.log(questions);

    if(questions){
      try{
        const data = await prisma.question.createMany({
          data:questions
        })

        if(data){
          return NextResponse.json({message:"done!"});
        }else{
          return NextResponse.json({message:"there is some problem in the database"});
        }
      }catch(e){
          return NextResponse.json({mesage:"internal server problem"})
      }
    }

    return NextResponse.json({message:"hi there haha"});
}