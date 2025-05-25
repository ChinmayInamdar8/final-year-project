import { PrismaClient } from "@repo/db/client";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req:Request){
    const {exam_id} = await req.json();
    ;
    console.log(exam_id);
    
    if(exam_id){
        try{
            const res = await prisma.mcq_exam.findFirst({
                where:{
                    Exam_id:exam_id
                }
            })

            console.log(res);

            return NextResponse.json({name:res?.name, no_of_questions:res?.no_of_questions});

        }catch(e){
            return NextResponse.json({error:"error1 from the catch"});
        }
    }

    return NextResponse.json({error:"error1"});


}