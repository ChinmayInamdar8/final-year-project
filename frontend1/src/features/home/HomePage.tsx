import { useNavigate } from "react-router-dom";
import { AppBar } from "../../components/AppBar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";


const texts = ["Welcome To FairTestPro!", "Make Online Exam Easily!", "Advanced Proctoring using ML", "Online Coding Exams!", "Online Hackthons!"];



export default function AnimatedText() {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [typing, setTyping] = useState(true);
  
    useEffect(() => {
      let charIndex = 0;
      setDisplayedText(""); // Reset text
  
      const typeInterval = setInterval(() => {
        if (charIndex <= texts[index].length) {
          setDisplayedText(texts[index].slice(0, charIndex)); // Use slice to avoid undefined
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setTyping(false), 1000); // Wait before fade out
        }
      }, 100); // Typing speed
  
      return () => clearInterval(typeInterval);
    }, [index]);
  
    useEffect(() => {
      if (!typing) {
        setTimeout(() => {
          setTyping(true);
          setIndex((prev) => (prev + 1) % texts.length); // Move to next string
        }, 1000); // Delay before switching text
      }
    }, [typing]);
  
    return (
      <div className="relative h-10">
        <AnimatePresence mode="wait">
          {typing && (
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute text-center font-bold text-3xl ml-4 mb-6 mt-3"
            >
              {displayedText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

export function HomePage(){
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen bg-yellow-50">
            <AppBar></AppBar>
            

            <div className="md:grid md:grid-cols-7 gap-4">
                <div className="col-span-3 mt-20">
                    <div className="ml-6">
                    <div className="font-medium text-3xl mb-3">
                        Simply Powerful
                    </div>
                    {/* <div >
                        Online Exams
                    </div> */}
                    <div className="font-bold text-5xl ml-4 mb-6">
                    <AnimatedText></AnimatedText>
                    </div>
                    <div className="text-xl">
                    Easy to get started and intuitive to use. <span className="font-medium text-2xl">FairTestPro</span> equips you with all the power and function you need to create secure exams for your students, your way.
                    </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-8"> 
                    <button className="border border-slate-700 rounded px-7 bg-green-600 py-1 text-white shadow hover:bg-green-500"  onClick={() => {
                navigate("/stdlogin");
              }}>Sign In</button>
                </div >
                </div>
                <div className="col-span-4 mt-5 hidden md:block">
                    <img src="/home_page.png" alt="" className="w-5/6"/>
                </div>
            </div>


           

        </div>
    )
}