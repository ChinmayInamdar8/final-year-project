import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async(req:Request)=>{
    const {exam_id} = await req.json();

    if(exam_id){
        const data =await prisma.question.findMany({
            where:{
                exam_id:exam_id
            }
        })

        console.log(data);

        return NextResponse.json({message:"done", data})
    }
    return NextResponse.json({message:"something wrong happend"})
}