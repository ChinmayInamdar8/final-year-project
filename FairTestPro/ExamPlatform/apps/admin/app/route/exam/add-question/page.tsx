"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface questionType {
  exam_id:string 
  question: string;
  options: string[];
  correctOption: number;
  question_no:number 
}

export default function Home() {
  const router = useRouter();
  const reduxExamId = useSelector((state: RootState) => state.exam.value);
  const [Loading, setLoading] = useState(true);
  const [examId, setExamId] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState<number>(0);
  const [questions, setQuestions] = useState<questionType[]>(
    Array.from({ length: noOfQuestions }, () => ({
      exam_id:examId,
      question: "",
      options: ["", "", "", ""],
      correctOption: 0,
      question_no:0 
    }))
  );

  useEffect(() => {
    const localExamId =
      reduxExamId || window.localStorage.getItem("exam_id") || "";
    setExamId(localExamId);
    window.localStorage.setItem("exam_id", localExamId);

    if (localExamId) {
      axios
        .put("/api/exam/create-exam/getexam", { exam_id: localExamId })
        .then((res) => {
          const value = parseInt(res.data.no_of_questions);
          setNoOfQuestions(value);
          console.log("Fetched no of questions:", value);

          console.log("the exam id is **********", localExamId);
          //   setting state of question
          setQuestions(
            Array.from({ length: value }, (_, index) => ({
              exam_id:localExamId,
              question: "",
              options: ["", "", "", ""],
              correctOption: 0,
              question_no: index + 1
            }))
          );

          setLoading(false);
        });
    }
  }, [reduxExamId]);

  if(Loading){
    return (
      <div className="bg-slate-300 h-[92vh] flex flex-col items-center ">
        <div className="bg-white w-3/4 h-96 rounded shadow-xl border-l-8 border-l-sky-600 flex flex-col px-7 py-5 my-7 gap-4 animate-pulse">
        <div className="w-24 h-5 bg-slate-200 rounded"></div>
        <div className="w-full h-12 bg-slate-200 rounded"></div>

        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="flex items-center gap-2 mt-2 w-full">
            <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
            <div className="w-full h-10 bg-slate-200 rounded"></div>
          </div>
        ))}

        <div className="flex items-center justify-center mt-6 w-full gap-4">
          <div className="w-32 h-8 bg-slate-200 rounded"></div>
          <div className="w-24 h-8 bg-slate-300 rounded"></div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className=" bg-slate-300 h-full flex flex-col items-center">
      <div className="flex w-full justify-between items-center">
        <div className="text-xl font-bold">Add Questions</div>
        <div className="bg-slate-700 text-white text-xl py-1 px-5 mx-5 rounded my-4">
          Exam-Id:{examId}
        </div>
      </div>
      {[...Array(noOfQuestions)].map((_, key) => (
        <QuestionBox
          key={key}
          ques_no={key + 1}
          questions={questions}
          setQuestions={setQuestions}
        ></QuestionBox>
      ))}

      <button className="bg-red-600 py-1 px-10 text-white text-xl rounded border-2 hover:border-black"
        onClick={async()=>{
          console.log(questions)
            const res =await axios.post('/api/exam/create-exam/save-questions', {
              questions
            })

            console.log(res);
            if(res.data.message==="done!"){
              Swal.fire({
                title: "Added the questions!",
                text: `You can give this link to students :- http://localhost:3001/route/start-assessment?id=${examId}`,
                icon: "success"
              });
              router.push("/");
            }else{
              alert(res.data.message)
            }
        }}
      >
        submit
      </button>
      <div className="mb-60"></div>
    </div>
  );
}

function QuestionBox({
  ques_no,
  questions,
  setQuestions,
}: {
  ques_no: number;
  questions: questionType[];
  setQuestions: Dispatch<SetStateAction<questionType[]>>;
}) {
  
  
    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = [...questions];
    const index = ques_no - 1;

    const questionItem = updated[index];
    if (questionItem) {
      questionItem.question = e.target.value;
      questionItem.question_no = ques_no;    // setting the question number
      updated[index] = questionItem;
      setQuestions(updated);
    }
  };
    const handleOption1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...questions];
    const index = ques_no - 1;

    const questionItem = updated[index];
    if (questionItem) {
      questionItem.options[0] = e.target.value;
      updated[index] = questionItem;
      setQuestions(updated);
    }
  };
    const handleOption2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...questions];
    const index = ques_no - 1;

    const questionItem = updated[index];
    if (questionItem) {
      questionItem.options[1] = e.target.value;
      updated[index] = questionItem;
      setQuestions(updated);
    }
  };
    const handleOption3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...questions];
    const index = ques_no - 1;

    const questionItem = updated[index];
    if (questionItem) {
      questionItem.options[2] = e.target.value;
      updated[index] = questionItem;
      setQuestions(updated);
    }
  };
    const handleOption4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...questions];
    const index = ques_no - 1;

    const questionItem = updated[index];
    if (questionItem) {
      questionItem.options[3] = e.target.value;
      updated[index] = questionItem;
      setQuestions(updated);
    }
  };
    const handleCorrectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = [...questions];
    const index = ques_no - 1;

    let ans = 0;
    switch (e.target.value) {
        case "A":
            ans =  0;
            break;
        case "B":
            ans =  1;
            break;
        case "C":
            ans =  2;
            break;
        case "D":
            ans =  3;
    
        default:
            break;
    }

    const questionItem = updated[index];
    if (questionItem) {
      questionItem.correctOption = ans;
      updated[index] = questionItem;
      setQuestions(updated);
    }
  };

  return (
    <div className="bg-white w-3/4 h-96 rounded shadow-xl border-l-8 border-l-sky-600 flex flex-col items-center px-7 my-7">
      <div>Question {ques_no}</div>
      <textarea
        name="question"
        id="question"
        placeholder="Question"
        className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2"
        onChange={handleQuestionChange}
      ></textarea>
      <div className="flex items-center gap-2 mt-4 w-full">
        <div className="w-6 h-6 bg-transparent border-2 border-slate-400 rounded-full"></div>
        <input
          type="text"
          name="option1"
          id="option1"
          placeholder="option 1"
          className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2 "
          onChange={handleOption1Change}
        />
      </div>
      <div className="flex items-center gap-2 mt-4 w-full">
        <div className="w-6 h-6 bg-transparent border-2 border-slate-400 rounded-full"></div>
        <input
          type="text"
          name="option2"
          id="option2"
          placeholder="option 2"
          className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2 "
          onChange={handleOption2Change}
        />
      </div>
      <div className="flex items-center gap-2 mt-4 w-full">
        <div className="w-6 h-6 bg-transparent border-2 border-slate-400 rounded-full"></div>
        <input
          type="text"
          name="option3"
          id="option3"
          placeholder="option 3"
          className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2 "
          onChange={handleOption3Change}
        />
      </div>
      <div className="flex items-center gap-2 mt-4 w-full">
        <div className="w-6 h-6 bg-transparent border-2 border-slate-400 rounded-full"></div>
        <input
          type="text"
          name="option4"
          id="option4"
          placeholder="option 4"
          className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2 "
          onChange={handleOption4Change}
        />
      </div>
      <div className="flex items-center justify-center mt-12 border border-red-400 py-3 px-10 rounded-sm">
        <label htmlFor="correctop">Correct Option :- </label>
        <select
          name="correctop"
          id="correctop"
          className="border border-sky-600 rounded py-1 px-7 focus:border-violet-600 focus:border-2 outline-none"
          onChange={handleCorrectOption}
        >
          <option value="A">Option 1</option>
          <option value="B">Option 2</option>
          <option value="C">Option 3</option>
          <option value="D">Option 4</option>
        </select>
      </div>
    </div>
  );
}
