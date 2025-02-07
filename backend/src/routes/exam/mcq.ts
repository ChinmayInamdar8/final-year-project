import express, { Express, Router, Request, Response } from "express";
import {  authenticatedRequest, examAuth } from "../../Auth/examAuth";
import z from "zod";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const router = Router();

const registerSchema = z.object({
    id:z.string(),
    test_name:z.string(),
    password:z.string(),
    no_question:z.string()
})

router.post('/register', examAuth,  async (req:authenticatedRequest, res:Response)=>{
    if(req.id){
        const adminId = req.id;

    const check = registerSchema.safeParse(req.body);
    if(!check.success){
        res.status(403).json({message:"Inputs are not correct please check inputs"});
        return;
    }

    const id = await prisma.testDetails.findFirst({
        where:{
            id:req.body.id
        }
    })

    if(id){
        res.status(403).json({message:"please refresh the page there is some problem"})
        return;
    }

    try{
        const data = await prisma.testDetails.create({
            data:{
                id:req.body.id,
                test_name:req.body.test_name,
                password:req.body.password,
                no_question:parseInt(req.body.no_question),
                adminId:parseInt(adminId.toString())
            }
        })

        res.json({message:"created successfully!", id:data.id});
    }catch(e){
        res.status(500).json({message:"somethig went wrong"});
    }
    }

})


router.post('/createtest', examAuth, async (req:authenticatedRequest, res:Response)=>{
    
})


export default router;