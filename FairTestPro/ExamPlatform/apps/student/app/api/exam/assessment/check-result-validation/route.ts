import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/nextSession";
import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req:Request){
    const session = await getServerSession(authOptions);
    const {exam_id} = await req.json();

    const email_id = session?.user?.email || "";

    const student_data = await prisma.student.findFirst({
        where:{
            email:email_id
        }
    })

    const student_id = student_data?.id;

    const data = await prisma.result.findFirst({
        where:{
            student_id:student_id,
            exam_id
        }
    })

    if(data){
        return NextResponse.json({message:"Invalid"});
    }
    return NextResponse.json({message:"valid"});
    
}