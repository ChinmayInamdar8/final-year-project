"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import MonitoringComponent from "./MonitoringComponent";

let global_no_of_questions = 0;

interface TypeActualQuestion {
  exam_id: string;
  question: string;
  actualOptions: string[];
  handleOptionSelect: (optionIndex: string) => void;
  selected: string;
  selected_question_number: number;
  set_question_number: Dispatch<SetStateAction<number>>;
}

export function ExamBoard({
  no_of_questions,
  exam_id,
}: {
  no_of_questions: number;
  exam_id: string;
}) {
  global_no_of_questions = no_of_questions;
  console.log(no_of_questions);
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(5425);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<string[]>([""]);
  const [selected_question_no, setSelected_question_no] = useState(1);
  const [selected_options, setSelected_options] = useState<string[]>(
    Array(no_of_questions).fill("")
  );

  const handleOptionSelect = (optionIndex: string) => {
    const updated = [...selected_options];
    updated[selected_question_no - 1] = optionIndex;
    setSelected_options(updated);
  };

  const format = (unit: number) => unit.toString().padStart(2, "0");

  const calculateTime = (remTime: number) => {
    let time = remTime;
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    let hours = Math.floor(mins / 60);
    mins = mins % 60;

    return `${format(hours)}:${format(mins)}:${format(secs)}`;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/exam/assessment/get-question", {
        ques_no: selected_question_no,
        exam_id: exam_id,
      })
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data.question);
        setOptions(res.data.options);
        setLoading(false);
      });
  }, [selected_question_no]);

  useEffect(() => {
    axios
      .post("/api/exam/assessment/get-time", {
        exam_id,
      })
      .then((res) => {
        console.log("The time of the exam is ", res.data);
        setRemainingTime(parseInt(res.data.duration) * 60);
      });
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      // handle things to do after timeup
      alert("your time is finished, your test will get automatically submitted!")
      axios
        .post("/api/exam/assessment/check-result", {
          options: selected_options,
          exam_id: exam_id,
          student_id: window.localStorage.getItem("student_id"),
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "done") {
            router.push(
              `/route/give-assessment/result?m=${res.data.data.marks}`
            );
          }
          return;
        });
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  if (loading) {
    return <ExamSkeleton></ExamSkeleton>;
  }

  return (
    <div className="w-full h-[92vh] flex flex-col overflow-hidden">
      <MonitoringComponent></MonitoringComponent>
      <div className=" flex justify-between mt-4 items-center">
        <div className="bg-slate-600 rounded px-8 ml-3 text-white">
          <p className="text-center text-xl">timer</p>
          <p className="text-center">{calculateTime(remainingTime)}</p>
        </div>
        <div className="bg-sky-600 py-1 rounded px-8 ml-3 text-white">
          Exam ID : {exam_id}
        </div>
        <div className="mr-4">
          <button
            className="px-8 rounded py-1 text-xl text-white bg-red-600"
            onClick={async () => {
              const res = await axios.post(
                "/api/exam/assessment/check-result",
                {
                  options: selected_options,
                  exam_id: exam_id,
                  student_id: window.localStorage.getItem("student_id"),
                }
              );

              console.log(res.data);
              if (res.data.message === "done") {
                router.push(
                  `/route/give-assessment/result?m=${res.data.data.marks}`
                );
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-full h-4/5 grid grid-cols-10 mt-3">
        <div className="col-span-1 h-full bg-slate-200 ml-1 mr-2 rounded shadow-lg overflow-y-auto overflow-x-hidden border-2 border-sky-600 flex flex-col items-center">
          {[...Array(no_of_questions)].map((_, key) => (
            <QuestionNumber
              key={key}
              ques_no={key + 1}
              setSelected_question_no={setSelected_question_no}
              selected_question_no={selected_question_no}
            ></QuestionNumber>
          ))}
        </div>
        <div className="col-span-9 h-full bg-slate-200 ml-2 mr-3 rounded shadow-xl overflow-y-auto overflow-x-hidden border-l-8 border-green-600 flex flex-col items-center">
          <div className=" rounded py-1 px-2 bg-green-600 text-white text-xl mt-2 shadow-xl">
            Q {selected_question_no}
          </div>

          <ActualQuestion
            exam_id={exam_id}
            question={question}
            actualOptions={options}
            handleOptionSelect={handleOptionSelect}
            selected={selected_options[selected_question_no - 1] || ""}
            selected_question_number={selected_question_no}
            set_question_number={setSelected_question_no}
          ></ActualQuestion>
        </div>
      </div>
    </div>
  );
}

const QuestionNumber = ({
  ques_no,
  setSelected_question_no,
  selected_question_no,
}: {
  ques_no: number;
  setSelected_question_no: Dispatch<SetStateAction<number>>;
  selected_question_no: number;
}) => {
  return (
    <button
      className={`py-1 px-2 border border-sky-600 rounded  my-2 ${
        selected_question_no == ques_no
          ? "bg-red-600 text-white"
          : "bg-orange-200"
      }`}
      onClick={() => setSelected_question_no(ques_no)}
    >
      Q {ques_no}
    </button>
  );
};

const ActualQuestion = ({
  exam_id,
  question,
  actualOptions,
  handleOptionSelect,
  selected,
  selected_question_number,
  set_question_number,
}: TypeActualQuestion) => {
  const options = [
    { id: "0", label: `${actualOptions[0]}` },
    { id: "1", label: `${actualOptions[1]}` },
    { id: "2", label: `${actualOptions[2]}` },
    { id: "3", label: `${actualOptions[3]}` },
  ];

  return (
    <div className="w-full flex flex-col mt-7">
      <p className="px-8">{question}</p>
      <div className="w-full flex flex-col mt-20 justify-center items-center px-44">
        {options.map((opt) => (
          <label
            key={opt.id}
            htmlFor={opt.id}
            className={`my-3 flex justify-start px-4 items-center w-full border-2 ${
              selected === opt.id
                ? "border-blue-800 bg-blue-100"
                : "border-sky-600"
            } rounded py-1 cursor-pointer transition`}
          >
            <input
              type="radio"
              name="options"
              id={opt.id}
              className="w-4 h-4"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => handleOptionSelect(opt.id)}
            />
            <span className="ml-6">{opt.label}</span>
          </label>
        ))}

        <div className="mt-4 text-lg font-medium w-full">
          Selected: {selected || "None"}
        </div>
      </div>

      <div className="w-full flex justify-between mb-5">
        <button
          className="mx-6 py-1 px-8 rounded text-white bg-green-600"
          onClick={() => {
            if (selected_question_number > 1) {
              set_question_number((prev) => prev - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className="mx-6 py-1 px-8 rounded text-white bg-violet-600"
          onClick={() => {
            if (selected_question_number < global_no_of_questions - 1) {
              set_question_number((prev) => prev + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// for laoding purpose :-

const ExamSkeleton = () => {
  return (
    <div className="w-full h-[92vh] flex flex-col overflow-hidden animate-pulse">
      <div className="flex justify-between mt-4 items-center">
        <div className="bg-slate-300 rounded px-8 ml-3 text-white h-16 flex flex-col justify-center items-center w-28">
          <div className="w-16 h-4 bg-slate-400 rounded mb-1"></div>
          <div className="w-20 h-4 bg-slate-400 rounded"></div>
        </div>
        <div className="bg-slate-300 py-3 rounded px-8 ml-3 text-white w-48 h-10"></div>
        <div className="mr-4">
          <div className="px-8 rounded py-2 bg-slate-400 w-28 h-10"></div>
        </div>
      </div>

      <div className="w-full h-4/5 grid grid-cols-10 mt-3">
        {/* Left Sidebar Skeleton (Question numbers) */}
        <div className="col-span-1 h-full bg-slate-200 ml-1 mr-2 rounded shadow-lg border-2 border-sky-600 flex flex-col items-center overflow-y-auto py-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-14 h-8 bg-slate-300 rounded my-2"></div>
          ))}
        </div>

        {/* Main Question Skeleton */}
        <div className="col-span-9 h-full bg-slate-200 ml-2 mr-3 rounded shadow-xl border-l-8 border-green-600 flex flex-col items-center overflow-y-auto px-8 py-4">
          <div className="w-32 h-8 bg-slate-300 rounded mb-4"></div>

          <div className="w-full mt-4">
            <div className="h-6 w-4/5 bg-slate-300 rounded mb-10 ml-6"></div>

            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center w-full mb-6">
                <div className="w-4 h-4 bg-slate-400 rounded-full ml-12"></div>
                <div className="w-3/4 h-6 bg-slate-300 rounded ml-6"></div>
              </div>
            ))}

            <div className="mt-4 ml-6 h-6 w-1/3 bg-slate-300 rounded"></div>
          </div>

          <div className="w-full flex justify-between mt-12 px-6">
            <div className="w-28 h-10 bg-slate-400 rounded"></div>
            <div className="w-28 h-10 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
