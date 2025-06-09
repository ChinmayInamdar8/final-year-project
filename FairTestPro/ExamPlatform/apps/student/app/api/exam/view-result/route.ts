import { PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/nextSession";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req:Request){
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "";

    const student_data = await prisma.student.findFirst({
        where:{
            email
        }
    })

    const student_id = student_data?.id;

    const result = await prisma.result.findMany({
        where:{
            student_id:student_id
        },
        include:{
            exam:{
                select:{
                    name:true
                }
            }
        }
    })

    if(result){
        return NextResponse.json({message:"valid", result});
    }
    return NextResponse.json({messaage:"invalid"});
}