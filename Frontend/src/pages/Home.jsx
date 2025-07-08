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
                setproblems(response.data);
            }catch(err){
                console.log("NO PROBLEMS TO DISPLAY");
            }
        }
        async function fetchSolvedProblems(){
            try{
                const response = await axiosClient.get('/problem/getAllProblemsSolvedByUser');
                setsolvedProblems(response.data);
            }catch(err){
                console.log("NO SOLVED PROBLEMS TO DISPLAY");
            }
        }
        fetchProblems();
        if(user){
            fetchSolvedProblems();
        }
    },[]);
    console.log("ALL PROBLEMS : ")
    console.log(problems);
    console.log("\n");

    console.log("SOLVED PROBLEMS : ")
    console.log(solvedProblems);

    return(
        <div className="w-full h-screen flex flex-col">
            <nav className="w-full h-8 bg-yellow-500 flex items-center">
                <button className="text-black text-3xl">Log Out</button>
            </nav>

            {/*FILTERS*/}
            <div className="w-full h-9 flex items-center">
                <div className="flex items-center">
                    <label htmlFor="statusFilter">Problem Status : </label>
                    <select value="All Problems" id="statusFilter">
                        <option value ="all">All Problems</option>
                        <option value ="solved">Solved Problems</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor="difficultyLevelFilter">Problem Difficulty Level : </label>
                    <select value="All Problems" id="difficultyLevelFilter">
                        <option value ="easy">Easy</option>
                        <option value ="medium">Medium</option>
                        <option value ="hard">Hard</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor="tagFilter">Problem Tag : </label>
                    <select value="All Problems">
                        <option value ="Arrays">Arrays</option>
                        <option value ="Linked List">Linked List</option>
                        <option value ="Graphs">Graphs</option>
                        <option value ="Stacks">Stacks</option>
                        <option value ="Queues">Queues</option>
                        <option value ="Binary Trees">Binary Trees</option>
                        <option value ="Binary Search Trees">Binary Search Trees</option>
                        <option value ="Dynamic Programming">Dynamic Programming</option>
                        <option value ="Strings">Strings</option>
                    </select>
                </div>
            </div>

            <div>
                THIS IS HOME PAGE
            </div>
        </div>
    )
}