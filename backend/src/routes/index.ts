import express, { Express , Router, Request, Response} from "express";
import StudentRouter from './student';
import adminRouter from './admin';

const router = Router();


router.use('/user/student', StudentRouter);
router.use('/user/admin', adminRouter);

export default router;
