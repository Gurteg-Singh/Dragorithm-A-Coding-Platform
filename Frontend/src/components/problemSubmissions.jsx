import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import axiosClient from "../utils/axiosClient";


export default function ProblemSubmissions(){

    const {problem} = useOutletContext();
    const [submissions,setsubmissions] = useState(null);
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(null);

    useEffect(()=>{
        setloading(true);
        async function fetchSubmissions() {
            try{
                const response = await axiosClient.get(`/problem/solutionsOfProblem/${problem?._id}`);
                setsubmissions(response?.data);
            }catch(err){
                seterror(err?.response?.data?.message || 'Something went wrong');
            }finally{
                setloading(false);
            }
        }
        fetchSubmissions();
    },[]);

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .custom-scrollbar::-webkit-scrollbar {
                width: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #2a2a2a;
                border-radius: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #3d3d3d;
                border-radius: 5px;
                border: 2px solid #2a2a2a;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #4a4a4a;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if(loading){
        return(
            <div className="text-white text-3xl flex items-center justify-center">Loading ...</div>
        )
    }

    console.log(submissions);
    return(
        <div>
            
        </div>
    )
}