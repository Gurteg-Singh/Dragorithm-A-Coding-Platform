import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { useLocation } from "react-router";

export default function Home() {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: 'all',
        status: 'all',
        tag: 'all'
    });

    const filteredProblems = problems.filter((val) => {
        const difficultyLevelCheck = filters.difficulty === 'all' || filters.difficulty === val.difficultyLevel;
        const tagsCheck = filters.tag === 'all' || val.tags.includes(filters.tag);
        const statusCheck = filters.status === 'all' || solvedProblems.some((data) => data._id === val._id);

        return difficultyLevelCheck && tagsCheck && statusCheck;
    });

    useEffect(() => {
        async function fetchProblems() {
            try {
                const response = await axiosClient.get('/problem/getAllProblems');
                setProblems(response.data);
            } catch (err) {
                console.log("NO PROBLEMS TO DISPLAY");
            }
        }
        async function fetchSolvedProblems() {
            try {
                const response = await axiosClient.get('/problem/getAllProblemsSolvedByUser');
                setSolvedProblems(response.data);
            } catch (err) {
                console.log("NO SOLVED PROBLEMS TO DISPLAY");
            }
        }
        fetchProblems();
        if (user) {
            fetchSolvedProblems();
        }
    }, [location.pathname]);

    function CreateProblem({ data, className }) {
        const isSolved = solvedProblems.some(prob => prob._id === data._id);
        
        return (
            <div className={`${className} grid grid-cols-12 gap-4 py-3 px-4 border-b border-gray-700 hover:bg-gray-800 transition-colors`}>
                <div className="col-span-5 flex items-center">
                    <span className="truncate">{data?.title}</span>
                    {isSolved && (
                        <span className="ml-2 px-2 py-0.5 bg-green-700 text-xs rounded-full">Solved</span>
                    )}
                </div>
                <div className={`col-span-2 flex items-center justify-center`}>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        data?.difficultyLevel === 'easy' 
                            ? 'bg-green-900 text-green-300' 
                            : data?.difficultyLevel === 'medium' 
                                ? 'bg-yellow-900 text-yellow-300' 
                                : 'bg-red-900 text-red-300'
                    }`}>
                        {data?.difficultyLevel}
                    </span>
                </div>
                <div className="col-span-5 flex flex-wrap gap-1 items-center">
                    {data?.tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 bg-indigo-900 text-indigo-300 rounded-full text-xs">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
            <Navbar />

            {/* Hero Section */}
            <div className="w-full max-w-6xl bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl p-8 my-6 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h1 className="text-3xl font-bold mb-2">Coding Challenge Platform</h1>
                        <p className="text-blue-200 max-w-lg">
                            Sharpen your skills with our curated collection of programming challenges.
                            Track your progress and climb the ranks!
                        </p>
                    </div>
                    <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-32 h-32 flex items-center justify-center text-gray-500">
                        LOGO
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="w-full max-w-6xl bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Status</label>
                        <select
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="all">All Problems</option>
                            <option value="solved">Solved Problems</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Difficulty</label>
                        <select
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                        >
                            <option value="all">All Levels</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Tags</label>
                        <select
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setFilters(prev => ({ ...prev, tag: e.target.value }))}
                        >
                            <option value="all">All Tags</option>
                            <option value="Arrays">Arrays</option>
                            <option value="Linked List">Linked List</option>
                            <option value="Graphs">Graphs</option>
                            <option value="Stacks">Stacks</option>
                            <option value="Queues">Queues</option>
                            <option value="Binary Trees">Binary Trees</option>
                            <option value="Binary Search Trees">Binary Search Trees</option>
                            <option value="Dynamic Programming">Dynamic Programming</option>
                            <option value="Strings">Strings</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Problems Table */}
            <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-md overflow-hidden mb-10">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-750 border-b border-gray-700 font-semibold">
                    <div className="col-span-5">Problem</div>
                    <div className="col-span-2 text-center">Difficulty</div>
                    <div className="col-span-5">Tags</div>
                </div>
                
                {/* Problems List */}
                <div className="divide-y divide-gray-700">
                    {filteredProblems.length > 0 ? (
                        filteredProblems.map((val) => (
                            <CreateProblem 
                                key={val?._id} 
                                data={val} 
                                className="cursor-pointer"
                            />
                        ))
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            No problems match your current filters
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}