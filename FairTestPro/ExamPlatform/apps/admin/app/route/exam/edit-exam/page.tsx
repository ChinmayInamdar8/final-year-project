"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";

export default function EditExam() {
  const searchParams = useSearchParams();
  const exam_id = searchParams.get("id");
  const [questions, setQuestions] = useState<
    {
      id: number;
      exam_id: string;
      question: string;
      question_no: number;
      options: string[];
      correctOption: number;
    }[]
  >();

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.post("/api/exam/edit-exam/get-exam", {
        exam_id,
      });
      console.log(res.data.data);
      setQuestions(res.data.data);

      console.log(questions);
    };
    fetchQuestions();
  }, [exam_id]);
  return (
    <div className="w-full h-full bg-slate-300 pb-20 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Edit Exam</div>
        <div className="bg-slate-700 text-white text-xl py-1 px-5 mx-5 rounded my-4">
          Exam-Id:{exam_id}
        </div>
      </div>
      <div>

            <div className="flex flex-col w-full items-center">
                {questions?.map((question, index)=>(
                    <QuestionsComponent key={index} index={index+1} question={question.question} options={question.options} correctOption={question.correctOption} setQuestions={setQuestions} question_no={question.question_no} allquestions={question}></QuestionsComponent>
                ))}
            </div>

            <div className="flex justify-center w-full items-center mt-10">
                <button className="py-1 px-8 text-center bg-sky-600 rounded shadow-md text-white text-xl hover:bg-sky-500"
                onClick={async ()=>{
                    const res = await axios.post("/api/exam/edit-exam/save-changes", {
                        questions
                    });

                    if(res.data.message==="done"){
                        alert("saved changes successfully!")
                        router.push("/route/exam/your-exams")
                    }
                }}
                >Upload Change</button>
            </div>

      </div>
    </div>
  );
}

interface QuestionsComponentProps{
    index : number
    question:string,
    options : string[]
    correctOption:number
    setQuestions:Dispatch<SetStateAction<{
        id: number;
        exam_id: string;
        question: string;
        question_no: number;
        options: string[];
        correctOption: number;
    }[] | undefined>>

    allquestions:{
        id: number;
        exam_id: string;
        question: string;
        question_no: number;
        options: string[];
        correctOption: number;
    }
    question_no:number
}

const QuestionsComponent = ({index, question, options, correctOption, setQuestions, allquestions, question_no}:QuestionsComponentProps)=>{
    console.log("the question is ", question);
    console.log("the options is ", options);



    const questionHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        const updatedQuestion = e.target.value;

        setQuestions((prevQuestions)=>{
            if(!prevQuestions) return prevQuestions;

            const updated = prevQuestions.map((prevQuestion)=>
                prevQuestion.question_no===question_no
                ? {...prevQuestion, question:updatedQuestion}:prevQuestion
        );

        return updated;

        })

    }
    

    const optionHandler = (e:ChangeEvent<HTMLInputElement>, optionIndex:number)=>{
        const newValue = e.target.value;

        setQuestions((prevQuestions)=>{
            if(!prevQuestions) return prevQuestions

            const updated = prevQuestions.map((q)=>{
                if(q.question_no==question_no){
                    const updatedOptions = [...q.options] as string[];
                    updatedOptions[optionIndex] = newValue;
                    return {...q, options:updatedOptions}
                }

                return q;
            })
            return updated;
            
        })
    }

    const correctOptionHandler = (e: ChangeEvent<HTMLSelectElement>)=>{
        const updatedOption = parseInt(e.target.value);

        setQuestions((prevQuestions)=>{
            if(!prevQuestions) return prevQuestions;

            const updated = prevQuestions.map((q)=>(
                q.question_no==question_no? {...q, correctOption:updatedOption} : q
            ));

            return updated;
        })
    }


    return (
        <div className="bg-white w-3/4 h-96 rounded shadow-xl border-l-8 border-l-sky-600 flex flex-col items-center px-7 my-7">
      <div>Question {index}</div>
      <textarea
        name="question"
        id="question"
        placeholder="Question"
        className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2"
        value={question}
        onChange={questionHandler}
      ></textarea>
      <div className="flex items-center gap-2 mt-4 w-full">
        <div className="w-6 h-6 bg-transparent border-2 border-slate-400 rounded-full"></div>
        <input
          type="text"
          name="option1"
          id="option1"
          placeholder="option 1"
          className="w-full border-b border-b-slate-500 outline-none focus:border-b-violet-700 focus:border-b-2 "
          value={options[0]}
        onChange={(e)=>{optionHandler(e, 0)}}
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
          value={options[1]}
        onChange={(e)=>{optionHandler(e,1)}}
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
          value={options[2]}
        onChange={(e)=>{optionHandler(e, 2)}}
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
          value={options[3]}
        onChange={(e)=>{optionHandler(e, 3)}}
        />
      </div>
      <div className="flex items-center justify-center mt-12 border border-red-400 py-3 px-10 rounded-sm">
        <label htmlFor="correctop">Correct Option :- </label>
        <select
          name="correctop"
          id="correctop"
          className="border border-sky-600 rounded py-1 px-7 focus:border-violet-600 focus:border-2 outline-none"
          value={correctOption.toString()}
          onChange={correctOptionHandler}
        >
          <option value="0">Option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
          <option value="3">Option 4</option>
        </select>
      </div>
    </div>
    )
}
