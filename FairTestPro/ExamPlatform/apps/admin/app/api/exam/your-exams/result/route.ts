import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function POST(req:Request){
    const {exam_id} = await req.json();
    if(exam_id){
        const result = await prisma.result.findMany({
            where:{
                exam_id
            },
            include:{
                student:{
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
        })

        return NextResponse.json(result);
    }

    return NextResponse.json({message:"exam id is not present!"});
    
}