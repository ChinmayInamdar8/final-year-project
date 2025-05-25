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
            >Signup For Free</button>
          </div>
        </div>
        <img src="examGiving.png" alt="exam giving" className="w-1/2" />
      </div>






      
      <div id="create-exam" className="w-full flex justify-between mt-32">

      <img
          src="create-exam.png"
          alt="secure_login"
          className="w-1/2 rounded-md shadow-2xl -rotate-6 mr-4"
        />

        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-2xl font-medium">Create Exam Easily!</p>

          <p className="text-xl px-10 mt-6 text-center">
            Create exam with just simple one click and with few settings No need
            to add complex settings to your exam!
          </p>
        </div>
        
      </div>




      <div  id="your-exam" className="w-full flex justify-between mt-36">
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-2xl font-medium">View all Your exams at ONE PLACE !</p>

          <p className="text-xl px-10 mt-6 text-center">
            Edit , delete your exams easily with the your exams tab.
          </p>
        </div>
        <img
          src="view-exam.png"
          alt="secure_login"
          className="w-1/2 rounded-md shadow-2xl mr-4 rotate-6"
        />
      </div>






      <div id="ai-proctor" className="w-full flex justify-between mt-36">

      <img
          src="AI-proctoring.png"
          alt="secure_login"
          className="w-1/2 rounded-md mr-4"
        />

        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-2xl font-medium">Set the Exam. We'll Watch Over It.</p>

          <p className="text-xl px-10 mt-6 text-center">
          Our AI-powered proctoring ensures a cheat-proof environment, letting you focus on what matters while we handle the rest.
          </p>
        </div>
       
      </div>
    </div>
  );
};
