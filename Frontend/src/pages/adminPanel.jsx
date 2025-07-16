import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosClient from "../utils/axiosClient";
import Navbar from "../components/navbar";

export default function AdminPanel(){

    const [problems,setproblems] = useState([]);

    useEffect(()=>{
        async function fetchProblems(){
            try{
                const response = await axiosClient.get('/problem/getAllProblems');
                setproblems(response.data);
            }catch(err){
                console.log("NO PROBLEMS TO DISPLAY");
            }
        }
        fetchProblems();
    },[]);

    return(
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header and Create Button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <Link to="/admin/createProblem">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Problem
                        </button>
                    </Link>
                </div>
                
                {/* Problems Table */}
                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-750 border-b border-gray-700 font-semibold">
                        <div className="col-span-5">Problem Title</div>
                        <div className="col-span-2">Difficulty</div>
                        <div className="col-span-3">Tags</div>
                        <div className="col-span-2 text-center">Actions</div>
                    </div>
                    
                    {/* Problems List */}
                    <div className="divide-y divide-gray-700">
                        {problems.length > 0 ? (
                            problems.map((val) => (
                                <div key={val?._id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-750 transition-colors">
                                    <div className="col-span-5 flex items-center">
                                        <span className="truncate">{val?.title}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            val?.difficultyLevel === 'easy' 
                                                ? 'bg-green-900 text-green-300' 
                                                : val?.difficultyLevel === 'medium' 
                                                    ? 'bg-yellow-900 text-yellow-300' 
                                                    : 'bg-red-900 text-red-300'
                                        }`}>
                                            {val?.difficultyLevel}
                                        </span>
                                    </div>
                                    <div className="col-span-3 flex flex-wrap gap-1">
                                        {val?.tags?.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-indigo-900 text-indigo-300 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                        {val?.tags?.length > 3 && (
                                            <span className="text-xs text-gray-400">+{val.tags.length - 3} more</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex justify-center space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition duration-200">
                                            Update
                                        </button>
                                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition duration-200">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="mt-4 text-lg">No problems found</p>
                                <p className="text-gray-500 mt-2">Create your first problem to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}