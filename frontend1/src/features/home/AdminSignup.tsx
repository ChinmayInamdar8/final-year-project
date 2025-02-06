import { InputLogin } from "../../components/InputLogin";
import { ButtonLogin } from "../../components/ButtonLogin";
import { BottomTextNavigate } from "../../components/BottomTextNavigate";
import { LoginTopText } from "../../components/LoginTopText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

interface response{
    message:string,
    token:string,
    name:string
}

export function AdminSignup() {
  const [full_name, setFull_name] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen  bg-slate-300 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/3  bg-white rounded-lg shadow-2xl border-2 border-green-600">
        <LoginTopText label="Admin Sign Up"></LoginTopText>

        <div className="w-full px-12">
          <InputLogin
            label="Full Name"
            type="text"
            placeholder="Jon Doe"
            OnChanage={(e) => {
              console.log(e.target.value);
              setFull_name(e.target.value);
            }}
          ></InputLogin>

          <InputLogin
            label="Phone Number"
            type="number"
            placeholder="0000000000"
            OnChanage={(e) => {
              console.log(e.target.value);
              setPhone_no(e.target.value);
            }}
          ></InputLogin>

          <InputLogin
            label="Email"
            type="email"
            placeholder="JonDoe@gmail.com"
            OnChanage={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
          ></InputLogin>

          <InputLogin
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            OnChanage={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
          ></InputLogin>

          <ButtonLogin
            label="Sign Up"
            OnClick={() => {
              console.log("button is pressed");
              MainWrapper(full_name, phone_no, password, email, navigate);
            }}
            OnEnter={(e) => {
              if (e.code == "enter") {
                console.log("button is pressed");
                MainWrapper(full_name, phone_no, password, email, navigate);
              }
            }}
          ></ButtonLogin>

          <BottomTextNavigate
            label="Already have account ?"
            to="Sign In"
            where="/adminlogin"
          ></BottomTextNavigate>
        </div>
      </div>
    </div>
  );
}


function MainWrapper(full_name:string, phone_no:string, password:string, email:string, navigate:any){
    

    async function CallTheBackend(){

        try{
            const result = await axios.post<response>("http://localhost:3000/api/user/admin/signup", {
                full_name,
                phone_no,
                password,
                email
            });
        
            console.log(result);

            if(result.data){
                if(result.data.message=="account created successfuly!"){
                  window.localStorage.setItem("token", result.data.token);
                  window.localStorage.setItem("name",result.data.name);
                    Swal.fire({
                        title: result.data.message,
                        text: "You will be redireced to the dashboard",
                        icon: "success"
                      });
                    navigate('/admindashboard')
                }
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
