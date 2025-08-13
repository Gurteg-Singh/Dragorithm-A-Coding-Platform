import { useParams } from "react-router"
import ProblemForm from "../components/problemForm"
import { useState,useEffect } from "react";
import axiosClient from "../utils/axiosClient";

export default function UpdateProblem(){
    const params = useParams();
    const problem_id  = params.id;
    const [problem,setproblem] = useState(null);

    useEffect(()=>{
        async function fetchProblemData(){
            try{
                const response = await axiosClient.get(`/problem/getProblem/${problem_id}`);
                const data = response?.data;
                if (data.solution) {
                    data.solution = data.solution.map(item => ({
                    ...item,
                    language: item.language.charAt(0).toUpperCase() + item.language.slice(1)
                    }));
                }
                
                setproblem(data);
            }catch(err){
                console.log("ERROR : " + err.message);
            }
        }
        fetchProblemData();
    },[]);

    if (!problem) 
        return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
        </div>
    );


    return(
        <div>
            <ProblemForm data={problem}/>
        </div>
    )
}
