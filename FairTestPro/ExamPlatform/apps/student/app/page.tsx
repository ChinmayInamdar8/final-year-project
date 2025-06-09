"use client"

import { useSession } from "next-auth/react";
import { AppBar } from "./components/AppBar";
import { MainPage } from "./components/MainPage";

export default function Home() {
  const {data:session} = useSession();
  return (
    <div className="w-screen h-screen bg-slate-100 flex flex-col items-center">
       <AppBar></AppBar>
       <MainPage></MainPage>
    </div>
  );
}
