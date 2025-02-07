import express, { Express , Router, Request, Response, NextFunction} from "express";
import  jwt  from "jsonwebtoken";
import JWT_KEY from "../secret";

export interface authenticatedRequest  extends Request{
    id?:string | object
}


export function examAuth(req:Request, res:Response, next:NextFunction){
    const head = req.headers.authorization || "";
    if(!head){
        res.status(403).json({mesage:"header doesn't exist for token varification"});
        return;
    }

    try{
        const id = jwt.verify(head, JWT_KEY);

    if(id){
        (req as authenticatedRequest).id = id;
       next();
    }

    }catch(e){
        res.status(403).json({message:"wrong inputs authentication failed!"});
    }
    

}