import { AppBarDashboard } from "../../components/AppBarDashboard";
import { ButtonLogin } from "../../components/ButtonLogin";
import { DashbordLinkButton } from "../../components/DashBoardLinkButton";
import { InputLogin } from "../../components/InputLogin";

export function StudentDashboard() {
  return (
    <div className="w-screen h-screen bg-slate-150">
      <AppBarDashboard name={window.localStorage.getItem("name")}></AppBarDashboard>

      <div className="text-center my-5 text-2xl ">Student Dashbord</div>

      <div className="grid grid-cols-5">
        <div className="col-span-3 m-4 mx-16 bg-slate-300 rounded-lg shadow-2xl">
          <div className="flex justify-center items-center mt-4">
            <div className="bg-lime-200 rounded-2xl p-1 text-xl px-20">
              Give Assessment
            </div>
          </div>
          <div>
            <div className="mx-32">
                <div className="mb-4 mt-4">
                <InputLogin label="Assessment Number" type="number" OnChanage={()=>console.log()} placeholder="123456"></InputLogin>
                </div>
                
                <div className="mb-4">
                <InputLogin label="Password" type="password" OnChanage={()=>console.log()} placeholder=""></InputLogin>
                </div>

                <div className="mb-7">
                <ButtonLogin label="Start Test" OnClick={()=>console.log()} OnEnter={()=>{window.location.href = 
                "https://write.geeksforgeeks.org/";}}></ButtonLogin>
                </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 m-4 bg-slate-300  rounded-lg shadow-2xl">
          <div className="flex flex-col justify-center items-center mt-4">
            <div className="bg-lime-200 rounded-2xl p-1 text-xl px-20">
              Quick Links
            </div>
            <div>
            <DashbordLinkButton label="Check Result" bg_color="voilet" OnClick={()=>{console.log()}}></DashbordLinkButton>
            <DashbordLinkButton label="Settings" bg_color="voilet" OnClick={()=>{console.log()}}></DashbordLinkButton>
            <DashbordLinkButton label="Sign Out" bg_color="red" OnClick={()=>{console.log()}}></DashbordLinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
