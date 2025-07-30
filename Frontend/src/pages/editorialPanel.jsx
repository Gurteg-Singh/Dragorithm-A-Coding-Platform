import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Link } from "react-router";


export default function EditorialPanel(){

    const [problems,setproblems] = useState([]);

    useEffect(()=>{
        async function fetchProblems() {
            try {
                const response = await axiosClient.get('/problem/getAllProblems');
                setproblems(response.data);
            } catch (err) {
                console.log("NO PROBLEMS TO DISPLAY");
            }
        }
        fetchProblems();
    },[])

    return(
        <div className="min-h-screen w-screen flex flex-col items-center">
            <div className="w-full">
                UPLOAD OR REMOVE EDITORIAL SOLUTIONS OF PROBLEMS
            </div>
            {/* Filters*/}
            <div className="h-12 w-full bg-pink-400">
                FILTERS AND SEARCH BAR WILL BE ADDED
            </div>
            <div className="flex-1 w-[80%] flex flex-col items-center">
                {
                    problems.map((val)=>{
                        return(
                            <div className="flex items-center gap-4" key={val?._id}>
                                <p>{val?.title}</p>
                                <p>{val?.difficultyLevel}</p>
                                <p>{val?.tags.join(",")}</p>
                                <Link to={`/admin/editorial/upload/${val?._id}`}><button className="bg-blue-500">Upload</button></Link>
                                <Link to={`/admin/editorial/remove/${val?._id}`}><button className="bg-red-500">Remove</button></Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}