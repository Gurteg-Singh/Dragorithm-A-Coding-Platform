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
        <div>
            <nav>
                {/* navigation button */}
            </nav>

            <div>
                {/* Filters */}
            </div>

            <div>
                THIS IS HOME PAGE
            </div>
        </div>
    )
}