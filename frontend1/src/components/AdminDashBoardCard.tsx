interface props{
    label:string,
    value:string
}


export function AdminDashBoardCard({label, value}:props){
    return (
        <div className="flex flex-col justify-center items-center bg-rose-100 rounded-2xl p-4 px-28 mx-10 my-4 shadow-2xl">
            <div className="text-xl text-center">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
        </div>
    )
}