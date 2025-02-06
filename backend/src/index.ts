import express, { Express } from "express";
import rootRouter from './routes/index';
import cors from 'cors';
const app:Express = express();
const port : number = 3000;


app.use(cors({
    origin:"http://localhost:5173"
}))


app.use('/api', rootRouter);

app.listen(port, ()=>{
    console.log("http://localhost:3000");
})

