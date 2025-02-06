
interface props{
    label:string
}
export function LoginTopText({label}:props){
    return (
        <div className="mt-2">
            <div className="font-semibold text-3xl mb-1">FairTestPro</div>
            <div className="text-xl mb-3">{label}</div> 
        </div>
    )
}