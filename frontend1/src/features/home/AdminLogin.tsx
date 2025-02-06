import { InputLogin } from "../../components/InputLogin";
import { ButtonLogin } from "../../components/ButtonLogin";
import { BottomTextNavigate } from "../../components/BottomTextNavigate";
import { LoginTopText } from "../../components/LoginTopText";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface response{
    message:string,
    token:string,
    name:string
}

export function AdminLogin(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return(
        <div className="h-screen w-screen  bg-slate-300 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-1/3  bg-white rounded-lg shadow-2xl border-2 border-green-600">
                    
                    <LoginTopText label="Admin Login"></LoginTopText>

                    <div className="w-full px-12">

                       <InputLogin label="Email" type="email" placeholder="JonDoe@gmail.com" OnChanage={(e)=>{
                        console.log(e.target.value);
                        setEmail(e.target.value);
                       }}></InputLogin>

                        <InputLogin label="Password" type="password" placeholder="Enter Your Password" OnChanage={(e)=>{
                        console.log(e.target.value);
                        setPassword(e.target.value);
                       }}></InputLogin>
                        

                        <ButtonLogin label="Sign In" OnClick={()=>{
                            console.log("button is pressed");
                            MainWrapper(password, email, navigate);
                        }} OnEnter={(e)=>{
                            if(e.code=='enter'){
                                console.log("button is pressed");
                                MainWrapper(password, email, navigate);
                            }
                        }}></ButtonLogin>

                        <BottomTextNavigate label="Don't have Account ?" to="Sign Up" where="/adminsignup"></BottomTextNavigate>

                        
                </div>
            </div>
        </div>
    )
};



function MainWrapper(password:string, email:string, navigate:any){
    

    async function CallTheBackend(){

        try{
            const result = await axios.post<response>("http://localhost:3000/api/user/admin/signin", {
                password,
                email
            });
        
            console.log(result);

            if(result.data){
                if(result.data.message=="Logged in successfuly!"){
                    window.localStorage.setItem("token", result.data.token);
                  window.localStorage.setItem("name",result.data.name);
                    Swal.fire({
                        title: "Logged in successfully!",
                        text: "You will be redireced to dashboard",
                        icon: "success"
                      });
                    navigate('/admindashboard')
                }
                console.log(result.data,"this is result ");
                
            }
        
            
        }catch(e:AxiosError){
            console.log(e);
            if(e.response.data){
                Swal.fire({
                    icon: "error",
                    title: await e.response.data.message,
                    text: "Please try again",
                  });
            }
        }
    }

    CallTheBackend();
}