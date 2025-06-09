import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface questionsType{
    options: string[];
    exam_id: string;
    question: string;
    id: number;
    question_no: number;
    correctOption: number;
}

export async function POST(req:Request){
    const {options, exam_id, student_id, alertCount} = await req.json();
    const numAlert = Number(alertCount);
    if(options && exam_id && student_id){
        const numaricOptions = options.map((opt:string)=>(opt === "" ? null : Number(opt)));

        const questions =await prisma.question.findMany({
            where:{
                exam_id:exam_id
            }
        })

        if(questions){
            // console.log(questions);
            // console.log(numaricOptions);
            const result:number = calculate_result(numaricOptions, questions)

            const data = await prisma.result.create({
                data:{
                    student_id:parseInt(student_id),
                    exam_id,
                    marks:result,
                    result_validity: numAlert >3 ? false : true 
                }
            })

            if(data){
                return NextResponse.json({message:"done", data});
            }else{
                return NextResponse.json({message:"prisma error"});
            }
        }else{
            return NextResponse.json({mesage:"wrong exam_id"})
        }
    }
    
    return NextResponse.json({mesage:"data did not received correctly!"})
}

const calculate_result = (options:number[], questions:questionsType[])=>{
    // 1 question = 10 marks
    let result = 0;


    questions.forEach((question:questionsType)=>{
        const index = question.question_no;
        console.log(question);
        console.log(options[index-1]);
        if(options[index-1]===question.correctOption){
            // console.log(options[index]);
            // console.log(question);
            result +=10;
        }
    })
    return result;
}