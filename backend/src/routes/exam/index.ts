import express, { Express, Router } from "express";
import mcqRouter from './mcq';
import cors from 'cors';


const router = Router();

router.use('/mcq', mcqRouter);

export default router;