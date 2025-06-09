import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/nextSession";

const prisma = new PrismaClient();


export async function GET(req:Request){
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || " ";

        const admin_data = await prisma.admin.findFirst({
            where:{
                email:email
            }
        })

        const data = await prisma.mcq_exam.findMany({
            where:{
                admin_id:admin_data?.id
            },
        })



        if(data){
            return NextResponse.json({message:"done", data});
        }

        return NextResponse.json({message:"there is no exam present"});
}