import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req:Request){
    const{email, image, exam_id} = await req.json();

    if(email && image && exam_id){
        const student = await prisma.student.findFirst({
            where:{
                email:email
            }
        });

        if(student){
            try{
                const res = await prisma.active_student.create({
                    data:{
                        exam_id:exam_id,
                        student_id:student.id,
                        image:image
                    }
                })

                if(res){
                    return NextResponse.json({message:"accepted", student_id:res.student_id});
                }
                return NextResponse.json({message:"not able to add you"});
            }catch(e){
                return NextResponse.json({error:e});
            }
        }
        return NextResponse.json({error:"Create your account first!"});
    }
}