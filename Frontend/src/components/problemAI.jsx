import { useState } from "react";
import { useOutletContext } from "react-router";
import { useForm} from "react-hook-form";
import axiosClient from "../utils/axiosClient";


export default function ProblemAI(){
    const {problem} = useOutletContext();
    const [messages,setmessages] = useState([]);

    const {register,handleSubmit , formState : {errors},reset} = useForm();

    async function getAnswer(d){
        reset();
        const response = await axiosClient.post("/ai/chat",d);
        const reply = response.data;

        setmessages((prev) => [...prev,{role : "user",parts: [{ text: d?.prompt }]},{role : "model",parts: [{ text: reply }]}]);
    }
    return(
        <div className="h-full w-full flex flex-col">
            <div className="h-[90%] w-full bg-amber-300 overflow-y-auto flex-col">
                <p className="self-start w-[80%]">{`Hi, I am Drago. How can I help you with ${problem.title} problem ?`}</p>
                {
                    messages.map((val,index)=>{
                        if(val?.role === "user"){
                            return(
                                <p className="self-end w-[40%] bg-cyan-300" key={index}>
                                    {val?.parts[0]?.text}
                                </p>
                            )
                        }else{
                            return(
                                <p className="self-end w-[80%]" key={index}>
                                    {val?.parts[0]?.text}
                                </p>
                            )
                        }
                    })
                }
            </div>
            <div className="h-[10%] w-full bg-fuchsia-400 relative">
                <form onSubmit={handleSubmit(getAnswer)}>
                    <textarea {...register('prompt')} rows={1} cols={40} className="bg-indigo-600"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}