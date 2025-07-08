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

    const filteredProblems = problems.filter((val)=>{
        const difficultyLevelCheck = filters.difficulty === 'all' || filters.difficulty === val.difficultyLevel;
        const tagsCheck = filters.tag === 'all' || val.tags.includes(filters.tag);
        const statusCheck = filters.status ==='all' || solvedProblems.some((data)=> data._id === val._id);

        return difficultyLevelCheck && tagsCheck && statusCheck;
    })

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

    console.log("FILTERED PROBLEMS : ")
    console.log(filteredProblems);

    function CreateProblem({data,className}){
        return(
            <div className={className}>
                <div>{data?.title}</div>
                <div>{data?.difficultyLevel}</div>
                <div>{data?.tags?.join(",")}</div>
            </div>
        )
    }

    return(
        <div className="w-full h-screen flex flex-col items-center">
            <nav className="w-full h-8 bg-yellow-500 flex items-center">
                <button className="text-black text-3xl">Log Out</button>
            </nav>

            <div className="w-[80%] h-60 bg-blue-300">
                PROGRESS AND LOGO SECTION 
            </div>

            {/*FILTERS*/}
            <div className="w-[80%] h-9 flex items-center justify-center">
                <div className="flex items-center mr-3">
                    <label htmlFor="statusFilter">Problem Status : </label>
                    <select id="statusFilter" onChange={(e)=> setfilters(prev => ({ ...prev, status: e.target.value }))}>
                        <option value ="all">All Problems</option>
                        <option value ="solved">Solved Problems</option>
                    </select>
                </div>
                <div className="flex items-center mr-3">
                    <label htmlFor="difficultyLevelFilter">Problem Difficulty Level : </label>
                    <select id="difficultyLevelFilter" onChange={(e)=> setfilters(prev => ({ ...prev, difficulty: e.target.value }))}>
                        <option value ="all">All Problems</option>
                        <option value ="easy">Easy</option>
                        <option value ="medium">Medium</option>
                        <option value ="hard">Hard</option>
                    </select>
                </div>
                <div className="flex items-center mr-3">
                    <label htmlFor="tagFilter">Problem Tag : </label>
                    <select id="tagFilter" onChange={(e)=> setfilters(prev => ({ ...prev, tag: e.target.value }))}>
                        <option value ="all">All Problems</option>
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
            
            {/*PROBLEMS*/}
            <div className="w-[80%] flex flex-col">
                {
                    filteredProblems.map((val)=>{
                        return(
                            <div key={val?._id}>
                                <CreateProblem data={val} className="w-full flex h-6 items-center justify-around"/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}