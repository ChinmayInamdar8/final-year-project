"use client"
import { useState } from "react";
import { Heading } from "../../components/Heading";
import { SubHeading } from "../../components/SubHeading";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Home(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
       try{
        const res = await axios.post("/api/auth/signup", {
            name,
            email,
            password
           });

           console.log(res);
           alert("Signup successful!");

           const re = await signIn("credentials", {
            email,
            password,
            redirect:true,
            callbackUrl:"/"
           })
       }catch(err:any){
        alert(err.response?.data?.error || "signup failed!");
       }
    }

    return (
        <div className="w-screen h-screen bg-slate-200 flex justify-center items-center ">
            <form
            onSubmit={handleSubmit}
             className="w-96 bg-white flex flex-col justify-center items-center rounded shadow-lg">
            <Heading heading="SignUp"></Heading>
            <SubHeading heading="Admin"></SubHeading>
            <div className="w-full px-10">
                <input type="text" name="name" id="name" placeholder="full Name" className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600" onChange={(e)=>{setName(e.target.value)}}/>
                <input type="text" name="email" id="email" placeholder="Email Id" className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" name="password" id="password" placeholder="Password" className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600" onChange={(e)=>{setPassword(e.target.value)}}/>

                <button 
                type="submit"
                className="bg-sky-600 text-white rounded py-1 px-6 w-full text-center outline-none my-6">Sign In</button>
            </div>
            </form>
        </div>
    )
}