
interface props{
    label:string,
    OnClick:()=>void,
    bg_color:string
}

export function DashbordLinkButton({label, OnClick, bg_color}:props){
    if(bg_color=="voilet"){
        return (
            <div className="w-full">
                <button className="text-white w-full bg-gray-900/80  rounded p-1 text-xl px-20 my-8">{label}</button>
            </div>
        )
    }
    else if(bg_color=='red'){
        return (
            <div className="w-full">
                <button className="text-white w-full bg-red-600  rounded p-1 text-xl px-20 my-8">{label}</button>
            </div>
        )
    }
}