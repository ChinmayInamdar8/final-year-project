import { useNavigate } from "react-router-dom";

export function AppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between bg-blue-900 text-white py-4 font-semibold text-2xl">
        <div className="ml-5 hover:text-amber-100">FairTestPro</div>
        <div className="flex justify-between text-xl font-normal">
          <div className="mx-9">
            <p className="hover:underline cursor-pointer">Contact Us</p>
          </div>
          <div className="mx-9">
            <button
              className="border border-slate-100 rounded px-7 bg-green-600 py-1 hover:bg-green-500"
              onClick={() => {
                navigate("/stdlogin");
              }}
            >
              Sign In
            </button>
          </div>
          <div className="mx-9">
            <button
              className="border border-slate-100 rounded px-7 bg-green-600 py-1 hover:bg-green-500"
              onClick={() => {
                navigate("/adminlogin");
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
