import express, { Express , Router, Request, Response} from "express";
import StudentRouter from './student';
import adminRouter from './admin';
import examRouter from './exam/index';

const router = Router();


router.use('/user/student', StudentRouter);
router.use('/user/admin', adminRouter);
router.use('/exam', examRouter);

export default router;
