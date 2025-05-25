import { PrismaClient } from "@repo/db/client";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req:Request){
    const {name, no_of_question, duration, result} = await req.json();

    console.log("name", name);
    console.log("no_of_question", no_of_question)
    console.log("duration", duration)
    console.log("result", result)
    
    const exam_idFun = customAlphabet("0987654321", 6);
    const exam_id = exam_idFun().toString();
    console.log(exam_id);
    
    if(name && no_of_question && duration){
        console.log(name, no_of_question, duration, result);
        try{
            const res = await prisma.mcq_exam.create({
                data:{
                    name:name,
                    no_of_questions:parseInt(no_of_question),
                    Exam_id:exam_id,
                    duration:parseInt(duration),
                    result_display:result
                }

            })

            console.log(res);

            return NextResponse.json({exam_id:exam_id});

        }catch(e){
            return NextResponse.json({error:"error1 from the catch"});
        }
    }

    return NextResponse.json({error:"error1"});


}