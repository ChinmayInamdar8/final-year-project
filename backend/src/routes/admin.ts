import express, { Express , Router, Request, Response} from "express";
import {PrismaClient} from '@prisma/client';
import jwt from "jsonwebtoken";
import {z} from 'zod';
import JWT_KEY from "../secret";

const prisma = new PrismaClient();

const router = Router();
router.use(express.json());
// ************************************zod shemas *******************************


const signupSchema = z.object({
    full_name:z.string(),
    email:z.string().email(),
    phone_no:z.string().length(10),
    password: z.string()
})


const signinSchema = z.object({
    email:z.string().email(),
    password:z.string()
})

// *********************************************************************************

router.post('/signup', async (req:Request, res:Response)=>{
    const check = signupSchema.safeParse(req.body);
    console.log(req.body);

    if(!check.success){
        console.log(check);
        res.status(403).json({message:"wrong input"});
        return;
    }

    const result = await prisma.admin.findFirst({
        where:{
            email:req.body.email
        }
    })

    if(result){
        res.status(411).json({message:"user already exists!"});
        return;
    }

    try{
        const data = await prisma.admin.create({
            data:{
                full_name:req.body.full_name,
                phone_no:req.body.phone_no,
                email:req.body.email,
                password:req.body.password
            }
        })

        const token = jwt.sign(data.id.toString(), JWT_KEY);

        res.json({message:"account created successfuly!", token:token, name:req.body.full_name});
    }catch(e){
        res.status(500).json({message:"Internal server error"});
    }

})

// *************************************************************************************

router.post('/signin', async(req:Request, res:Response)=>{
    const check = signinSchema.safeParse(req.body);

    if(!check.success){
        res.status(403).json({message:"wrong input"});
        return;
    }

    try{
        const result = await prisma.admin.findFirst({
            where:{
                email:req.body.email,
            }
        })
        if(result){

            if(result.password==req.body.password){
                const token = jwt.sign(result.id.toString(), JWT_KEY);
                console.log(result.full_name);
                res.json({message:"Logged in successfuly!", token:token, name:result.full_name});
            }else{
                res.status(403).json({message:"Incorrect password, try again!"});

            }

        }else{
            res.status(403).json({message:"User does not exits, please signup "})
        }

    }catch(e){
        res.status(500).json({message:"Internal server error"});
    }
})





export default router;
