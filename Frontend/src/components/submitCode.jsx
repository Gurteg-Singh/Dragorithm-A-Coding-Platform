import {useState,useEffect} from "react";
import {useParams} from "react-router";
import axiosClient from "../utils/axiosClient";

export default function SubmitCode({editorRef,lang,problem}){
    const params = useParams();
    const problem_id = params.id;
    const language = lang;
    const code = editorRef.current.getValue();
    const [result,setresult] = useState(null)

    useEffect(()=>{
        async function subCode(){
            const response = await axiosClient.post(`/submission/submit/${problem_id}`,{language,code});
            console.log(response?.data);
            setresult(response?.data);
        }
        subCode();
    },[]);

    if(!result){
        return(
            <div className="h-full w-full bg-neutral-800">
                <p className="text-white">Submitting...</p>
            </div>
        )
    }

    return(
        <div className="h-full w-full bg-neutral-800">
            <p className="text-white">DONE</p>
        </div>
    )
}