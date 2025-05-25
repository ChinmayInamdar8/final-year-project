import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();


export async function POST(req:Request){
    const {name, email, password, image} = await req.json();


    if(!email || ! password || ! name || !image){
        return NextResponse.json({error:"name, Email, password required!", name, email, password});
    }

    const result = await prisma.student.findFirst({
        where:{
            email:email
        }
    });
    
    if(result){
        return NextResponse.json({error:"user already exists!"});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        await prisma.student.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword,
                image:image
            }
        });
    
        return NextResponse.json({message:"User created successfully!"});
    }catch(e){
        return NextResponse.json({error:"there is some problem", e});
    }
}