"use client"
import { useState } from "react";
import { Heading } from "../../components/Heading";
import { SubHeading } from "../../components/SubHeading";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect:false,
        });
        if(res?.ok){
            router.push("/")
        }else{
            alert("Wrong Credentials!");
        }

    };
    return (
        <div className="w-screen h-screen bg-slate-200 flex justify-center items-center ">
            <form 
            onSubmit={handleSubmit}
            className="w-96 bg-white flex flex-col justify-center items-center rounded shadow-lg">
            <Heading heading="SignIn"></Heading>
            <SubHeading heading="Admin"></SubHeading>
            <div className="w-full px-10">
                <input type="text" name="email" id="email" placeholder="Email Id" className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" name="password" id="password" placeholder="Password" className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600" onChange={(e)=>{setPassword(e.target.value)}}/>

                <button 
                type="submit"
                className="bg-sky-600 text-white rounded py-1 px-6 w-full text-center outline-none my-6">Sign In</button>
                <p className="text-center text-slate-700 mb-5">don't have account ? <span className="underline cursor-pointer text-sky-600" onClick={()=>{
                    router.push("/route/signup")
                }}>Create account</span></p>
            </div>
            </form>
        </div>
    )
}