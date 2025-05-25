import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const {email} = await req.json();

    if(email){
        const image = await prisma.student.findFirst({
            where:{
                email:email
            }
        })

        if(image){
            return NextResponse.json({message:"done", image});
        }else{
            return NextResponse.json({message:"wrong email id"});
        }
    }

    return NextResponse.json({message:"no email id is provided"});
}