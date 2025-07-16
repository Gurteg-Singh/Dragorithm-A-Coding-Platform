import Editor from '@monaco-editor/react';
import Navbar from '../components/navbar';
import { Link, NavLink, Outlet, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';

export default function ProblemPage(){
    const params = useParams();
    const problem_id = params.id;
    const [problem,setproblem] = useState({});

    useEffect(()=>{
        async function fetchProblemData(){
            try{
                const response = await axiosClient.get(`/problem/getProblem/${problem_id}`);
                setproblem(response.data);
            }catch(err){
                console.log("ERROR : " + err.message);
            }
        }
        fetchProblemData();
    },[])

    console.log(problem);

    return(
        <div className="h-screen w-screen flex flex-col">
            <div className='w-full'>
                <Navbar/>
            </div>
            <div className='w-full flex flex-1'>
                {/* Left Side */}
                <div className="h-[100%] w-[45%] bg-gray-600">
                    <div>
                        <nav className='flex w-full justify-around items-center text-1xl text-white font-bold border-1 border-amber-400'>
                            <NavLink to={`/problem/${problem_id}/description`} className={({ isActive }) =>isActive? "text-yellow-400": "text-white"}><div>Description</div></NavLink>
                            <NavLink to={`/problem/${problem_id}/editorial`} className={({ isActive }) =>isActive? "text-yellow-400": "text-white"}><div>Editorial</div></NavLink>
                            <NavLink to={`/problem/${problem_id}/solution`} className={({ isActive }) =>isActive? "text-yellow-400": "text-white"}><div>Solution</div></NavLink>
                            <NavLink to={`/problem/${problem_id}/submissions`} className={({ isActive }) =>isActive? "text-yellow-400": "text-white"}><div>Submissions</div></NavLink>
                        </nav>
                    </div>
                    <Outlet context = {problem}></Outlet>
                </div>

                {/*Right Side*/}
                <div className="h-[100%] w-[55%] bg-blue-200">

                </div>
            </div>
        </div>
    )
}