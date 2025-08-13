import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { useLocation, Link } from "react-router";
import Footer from "../components/footer";

export default function AllProblems() {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: 'all',
        status: 'all',
        tag: 'all'
    });

    // Add custom scrollbar effect from landing page
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
            <div className={`${className} grid grid-cols-12 gap-4 py-3 px-4 border-b border-neutral-700 hover:bg-neutral-800 transition-colors`}>
                <div className="col-span-5 flex items-center">
                    <Link to={`/problem/${data?._id}`} className="text-white hover:text-gray-300">
                        <span className="truncate">{data?.title}</span>
                    </Link>     
                    {isSolved && (
                        <span className="ml-2 px-2 py-0.5 bg-green-800 text-green-200 text-xs rounded-full">Solved</span>
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
                        <span key={index} className="px-2 py-0.5 bg-neutral-700 text-neutral-200 rounded-full text-xs">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="custom-scrollbar w-full min-h-screen flex flex-col bg-neutral-900">
            <Navbar />

            <div className="flex-1 flex flex-col items-center py-8">
                {/* Hero Section - Matching Landing Page */}
                <div className="w-[90%] max-w-6xl flex flex-col items-center mb-8 text-center">
                    <p className="text-5xl mb-4 text-white" style={{ textShadow: '2px 2px 4px gray' }}>
                        Master Coding Challenges
                    </p>
                    <p className="text-xl text-neutral-300 max-w-2xl">
                        Sharpen your skills with our curated collection of programming challenges.
                        Track your progress and climb the ranks!
                    </p>
                </div>

                {/* Filters */}
                <div className="w-[90%] max-w-6xl bg-neutral-800 rounded-2xl p-6 mb-8 border border-neutral-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400">Status</label>
                            <select
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-2 px-3 text-white focus:outline-none"
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            >
                                <option value="all">All Problems</option>
                                <option value="solved">Solved Problems</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400">Difficulty</label>
                            <select
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-2 px-3 text-white focus:outline-none"
                                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                            >
                                <option value="all">All Levels</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400">Tags</label>
                            <select
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-2 px-3 text-white focus:outline-none"
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
                <div className="w-[90%] max-w-6xl bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 mb-12">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 py-4 px-4 bg-neutral-800 border-b border-neutral-700 font-semibold">
                        <div className="col-span-5 text-neutral-200">Problem</div>
                        <div className="col-span-2 text-center text-neutral-200">Difficulty</div>
                        <div className="col-span-5 text-neutral-200">Tags</div>
                    </div>
                    
                    {/* Scrollable Problems List */}
                    <div 
                        className="custom-scrollbar divide-y divide-neutral-700"
                        style={{ maxHeight: '60vh', overflowY: 'auto' }}
                    >
                        {filteredProblems.length > 0 ? (
                            filteredProblems.map((val) => (
                                <CreateProblem 
                                    key={val?._id} 
                                    data={val} 
                                    className="cursor-pointer"
                                />
                            ))
                        ) : (
                            <div className="py-8 text-center text-neutral-500">
                                No problems match your current filters
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
