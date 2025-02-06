
interface props{
    name:string|null 
}

export function AppBarDashboard({name}:props){
    return (
        <div className="bg-slate-700 flex justify-between text-white h-12 items-center">
            <div className="font-semibold text-xl">FairTestPro</div>
            <div className="font-semibold text-2xl">DashBoard</div>
            <div className="flex justify-between ">
                <div className="text-lg mr-5 text-center items-center">
                Hello,{" " +name}
                </div>
                <div className="w-10 h-10 rounded-full bg-green-400 flex justify-center items-center mr-5">
                    <div className="flex justify-center items-center text-center text-slate-900 font-medium text-xl">
                        {name[0]}
                    </div>
                </div>
            </div>
        </div>
    )
}