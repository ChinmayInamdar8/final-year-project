import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request){

        const data = await prisma.mcq_exam.findMany({

        })



        if(data){
            return NextResponse.json({message:"done", data});
        }

        return NextResponse.json({message:"there is no exam present"});
}