"use client";
import { useRef, useState } from "react";
import { Heading } from "../../components/Heading";
import { SubHeading } from "../../components/SubHeading";
import axios from "axios";
import { signIn } from "next-auth/react";
import Webcam from "react-webcam";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        image,
      });

      console.log(res);
      alert("Signup successful!");

      const re = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (err: any) {
      alert(err.response?.data?.error || "signup failed!");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-200 flex justify-center items-center overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-2/5 bg-white flex flex-col justify-center items-center rounded shadow-lg my-16"
      >
        <Heading heading="SignUp"></Heading>
        <SubHeading heading="Admin"></SubHeading>
        <div className="w-full px-10">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="full Name"
            className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email Id"
            className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border border-slate-500 rounded py-1 px-6 w-full text-center outline-none my-6 text-sky-600 placeholder-sky-600"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="w-full px-10 flex flex-col justify-center items-center">
            {!image ? (
              <>
                <Webcam
                  audio={false}
                  height={180}
                  screenshotFormat="image/jpeg"
                  width={250}
                  ref={webcamRef}
                  videoConstraints={{ facingMode: "user" }}
                ></Webcam>

                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-1 mt-2 rounded w-full"
                  onClick={capture}
                >
                  Capture Image
                </button>
              </>
            ) : (
              <>
                <img
                  src={image}
                  alt="captured"
                  className="w-48 h-32 object-cover"
                />
                <button
                  type="button"
                  className="text-blue-500 underline mt-1"
                  onClick={() => setImage(null)}
                >
                  Capture again
                </button>
              </>
            )}
          </div>

          <button
            type="submit"
            className="bg-sky-600 text-white rounded py-1 px-6 w-full text-center outline-none my-6"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
