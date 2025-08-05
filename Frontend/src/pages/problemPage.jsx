import Navbar from '../components/navbar';
import { Link, NavLink, Outlet, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import CodeEditor from '../components/codeEditor';
import SubmitCode from '../components/submitCode';
import Compilation from '../components/compilation';

export default function ProblemPage(){
    const params = useParams();
    const problem_id = params.id;
    const [problem,setproblem] = useState({});


    const [lang,setlang] = useState("c++");
    const [isActive,setisActive] = useState("code");
    const editorRef = useRef(null);
    const codeRef = useRef("");
    const hasMounted = useRef(false);

    useEffect(()=>{
        async function fetchProblemData(){
            try{
                const response = await axiosClient.get(`/problem/getProblem/${problem_id}`);
                setproblem(response?.data);
            }catch(err){
                console.log("ERROR : " + err.message);
            }
        }
        fetchProblemData();
    },[])


    return (
        <div className="h-screen w-screen flex flex-col bg-gray-700">
            <Navbar />
            
            <div className='w-full flex flex-1 overflow-hidden'>
                {/* Left Side (45%) */}
                <div className="h-full w-[45%] flex flex-col bg-neutral-800 border-r-1 border-white">
                    {/* Navigation Tabs */}
                    <div className="h-12 flex bg-gray-700">
                        <NavLink 
                            to={`/problem/${problem_id}/description`} 
                            className={({ isActive }) => 
                                `flex-1 flex items-center justify-center ${isActive ? 
                                    "bg-neutral-800 text-indigo-400 border-2 border-indigo-400 border-b-0" : 
                                    "text-gray-400 hover:bg-gray-750"}`
                            }
                        >
                            Description
                        </NavLink>
                        <NavLink 
                            to={`/problem/${problem_id}/editorial`} 
                            className={({ isActive }) => 
                                `flex-1 flex items-center justify-center ${isActive ? 
                                    "bg-neutral-800 text-indigo-400 border-2 border-indigo-400 border-b-0" : 
                                    "text-gray-400 hover:bg-gray-750"}`
                            }
                        >
                            Editorial
                        </NavLink>
                        <NavLink 
                            to={`/problem/${problem_id}/solution`} 
                            className={({ isActive }) => 
                                `flex-1 flex items-center justify-center ${isActive ? 
                                    "bg-neutral-800 text-indigo-400 border-2 border-indigo-400 border-b-0" : 
                                    "text-gray-400 hover:bg-gray-750"}`
                            }
                        >
                            Solution
                        </NavLink>
                        <NavLink 
                            to={`/problem/${problem_id}/submissions`} 
                            className={({ isActive }) => 
                                `flex-1 flex items-center justify-center ${isActive ? 
                                    "bg-neutral-800 text-indigo-400 border-2 border-indigo-400 border-b-0" : 
                                    "text-gray-400 hover:bg-gray-750"}`
                            }
                        >
                            Submissions
                        </NavLink>
                        <NavLink 
                            to={`/problem/${problem_id}/ai`} 
                            className={({ isActive }) => 
                                `flex-1 flex items-center justify-center ${isActive ? 
                                    "bg-neutral-800 text-indigo-400 border-2 border-indigo-400 border-b-0" : 
                                    "text-gray-400 hover:bg-gray-750"}`
                            }
                        >
                            Ask AI
                        </NavLink>
                    </div>
                    
                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-2 text-gray-200">
                        <Outlet context={{problem,lang}} />
                    </div>
                </div>

                {/* Right Side (55%) */}
                <div className="h-full w-[55%] flex flex-col bg-gray-700 border-l ">
                    {/* Top Navigation Bar */}
                    <div className="h-12 flex items-center justify-between px-4 bg-gray-700 ">
                        <div>
                            <select 
                                value={lang} 
                                onChange={(e) => setlang(e.target.value)}
                                className="bg-gray-700 text-gray-200 border border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="c++">C++</option>
                                <option value="java">Java</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                        </div>
                        
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setisActive("code")}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${
                                    isActive === "code" 
                                        ? "bg-indigo-600 text-white" 
                                        : "bg-indigo-600 text-white"
                                }`}
                            >
                                Code
                            </button>
                        </div>
                    </div>
                    
                    {/* Editor Area */}
                    <div className='flex-1 overflow-hidden'>
                        {isActive === "code" && problem?.code?.length > 0 && (<CodeEditor editorRef={editorRef} lang={lang} problem={problem} codeRef={codeRef} hasMounted={hasMounted}/>)}
                        {isActive === "run" && <Compilation editorRef={editorRef} lang={lang} problem={problem} codeRef={codeRef}/>}
                        {isActive === "submit" && <SubmitCode editorRef={editorRef} lang={lang} problem={problem} codeRef={codeRef}/>}
                    </div>
                    
                    {/* Bottom Action Bar */}
                    <div className='h-12 flex items-center justify-end px-4 bg-gray-700'>
                        <button 
                            onClick={() => setisActive("run")}
                            className="px-4 py-2 mr-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition"
                        >
                            Run
                        </button>
                        <button 
                            onClick={() => setisActive("submit")}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}