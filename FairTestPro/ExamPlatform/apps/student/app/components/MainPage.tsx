import { useRouter } from "next/navigation";

export const MainPage = () => {

    const router = useRouter();
  return (
    <div className="w-full overflow-x-hidden bg-slate-100 scroll-smooth mt-10">




      <div id="welcome" className="w-full flex justify-between">
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-2xl font-medium">Simply Powerful</p>
          <h1 className="text-4xl font-bold mt-4">Welcome to FairTestPro!</h1>

          <p className="text-xl px-10 mt-6 text-center">
            Easy to get started and intuitive to use.{" "}
            <span className="font-bold">FairTestPro</span> equips you with all
            the power and function you need to create secure exams for your
            students, your way.
          </p>
          <div className="mt-10">
            <button className="text-white text-xl bg-slate-900 py-2 px-12 rounded-2xl shadow-lg border border-black hover:border-white"
            onClick={()=>router.push("/route/signup")}
            >Signup Now!</button>
          </div>
        </div>
        <img src="examGiving.png" alt="exam giving" className="w-1/2" />
      </div>

    </div>
  );
};
