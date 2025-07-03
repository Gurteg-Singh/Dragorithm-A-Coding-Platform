import { useEffect,useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useSelector } from "react-redux";

export default function Home(){
    const {user,isAuthenticated,loading} = useSelector((state)=>state.auth);

    const [problems,setproblems] = useState([]);
    const [solvedProblems,setsolvedProblems] = useState([]);
    const [filters,setfilters] = useState({
        difficulty : 'all',
        status : 'all',
        tag : 'all'
    });

    useEffect(()=>{
        async function fetchProblems(){
            try{
                const response = await axiosClient.get('/problem/getAllProblems');
                setproblems(response);
            }catch(err){
                console.log("NO PROBLEMS TO DISPLAY");
            }
        }
        async function fetchSolvedProblems(){
            try{
                const response = await axiosClient.get('/problem//getAllProblemsSolvedByUser');
                setsolvedProblems(response);
            }catch(err){
                console.log("NO SOLVED PROBLEMS TO DISPLAY");
            }
        }
        fetchProblems();
        if(user){
            fetchSolvedProblems();
        }
    },[]);

    return(
        <div className="h-screen w-screen bg-gray-100">
            <nav className="h-16 w-full bg-blue-300">
                {/* navigation button */}
            </nav>

            <div className="h-16 w-full bg-green-200">
                {/* Filters */}
            </div>

            <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {/* ALL PROBLEMS */}
                {problems.map((problem) => (
                    <div key={problem._id} className="bg-white shadow-md p-4 rounded-xl border border-gray-200">
                        <h2 className="text-lg font-semibold">{problem.title}</h2>
                        <p className="text-sm text-gray-600 capitalize mt-1">Difficulty: {problem.difficultyLevel}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {problem.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}