"use client"
import { getSession, useSession } from "next-auth/react";
import { AppBar } from "./components/AppBar";
import { MainPage } from "./components/MainPage";




export default function Home() {
  const {data:session} = useSession();
  return (
    <div className="bg-slate-100 flex flex-col items-center">
      <AppBar/>
      <MainPage></MainPage>
    </div>
  );
}
