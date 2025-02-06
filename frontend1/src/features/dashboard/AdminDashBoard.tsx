import { AdminDashBoardCard } from "../../components/AdminDashBoardCard";
import { AppBarDashboard } from "../../components/AppBarDashboard";
import { CreateTestForm } from "../../components/CreateTestForm";



export function AdminDashboard(){
    return(
        <div className="w-screen h-full bg-slate-150">
            <AppBarDashboard name={window.localStorage.getItem("name")}></AppBarDashboard>
            <div className="text-center my-5 text-2xl ">Admin Dashbord</div>


            <div className="w-full flex justify-center items-center ">
                <div className="w-8/10 bg-slate-300 h-96 rounded-lg shadow-2xl flex flex-col items-center">
                    <div className="bg-lime-200 rounded-2xl p-1 text-xl px-20 w-56 mt-4">Overview</div>
                    <div className="grid grid-cols-2">
                        <AdminDashBoardCard label="Test Created" value="4"></AdminDashBoardCard>
                        <AdminDashBoardCard label="Overall Student participation" value="45"></AdminDashBoardCard>
                        <AdminDashBoardCard label="Latest Student Participation" value="20"></AdminDashBoardCard>
                        <AdminDashBoardCard label="Fail to Pass Ratio" value="Pass:13% Fail:78%"></AdminDashBoardCard>
                    </div>
                </div>
            </div>

            <CreateTestForm></CreateTestForm>
        </div>
    )
}