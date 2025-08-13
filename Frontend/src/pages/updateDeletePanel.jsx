import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Search, X, Edit, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

export default function UpdateDeletePanel() {
    const [problems, setProblems] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        tag: "all"
    });
    
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            searchTerm: ""
        }
    });
    
    const searchTerm = watch("searchTerm");

    // Add custom scrollbar effect
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

    useEffect(() => {
        async function fetchProblems() {
            try {
                const response = await axiosClient.get('/problem/getAllProblems');
                setProblems(response.data);
            } catch (err) {
                console.log("NO PROBLEMS TO DISPLAY");
            }
        }
        fetchProblems();
    }, []);

    const filteredProblems = problems.filter(problem => {
        const nameMatch = problem.title.toLowerCase().includes(filters.name.toLowerCase());
        const tagMatch = filters.tag === "all" || problem.tags.includes(filters.tag);
        return nameMatch && tagMatch;
    });

    const handleSearch = (data) => {
        const trimmedSearch = data.searchTerm.trim();
        setFilters(prev => ({ ...prev, name: trimmedSearch }));
    };

    const handleReset = () => {
        reset({ searchTerm: "" });
        setFilters(prev => ({ ...prev, name: "" }));
    };

    return (
        <div className="custom-scrollbar min-h-screen w-full flex flex-col bg-neutral-900">
            <Navbar />
            
            <div className="flex-1 flex flex-col items-center py-8">
                {/* Header */}
                <div className="w-[90%] max-w-6xl flex flex-col items-center mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px gray' }}>
                        Problem Management
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-xl text-neutral-300 max-w-2xl">
                        Update or delete coding problems from the platform
                    </p>
                </div>

                {/* Filters Section */}
                <div className="w-[90%] max-w-6xl bg-neutral-800 rounded-2xl p-6 mb-8 border border-neutral-700">
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Combined Search Bar with Button */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-400">Search Problems</label>
                                <div className="flex">
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            {...register("searchTerm")}
                                            className="w-full bg-neutral-900 border border-neutral-700 rounded-l-xl py-2 pl-10 pr-10 text-white focus:outline-none"
                                            placeholder="Search problem titles..."
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-neutral-400" />
                                        </div>
                                        {searchTerm && (
                                            <button 
                                                type="button"
                                                onClick={handleReset}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                <X className="h-5 w-5 text-neutral-400 hover:text-white" />
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-r-xl hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center"
                                    >
                                        <Search className="h-5 w-5 mr-1 md:mr-0 md:hidden" />
                                        <span className="hidden md:block">Search</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Tag Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-neutral-400">Filter by Tag</label>
                                <select
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-2 px-3 text-white focus:outline-none"
                                    onChange={(e) => setFilters(prev => ({ ...prev, tag: e.target.value }))}
                                    value={filters.tag}
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
                    </form>
                </div>

                {/* Problems Table */}
                <div className="w-[90%] max-w-6xl bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 mb-12">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 py-4 px-4 bg-neutral-800 border-b border-neutral-700 font-semibold">
                        <div className="col-span-4 text-neutral-200">Problem</div>
                        <div className="col-span-2 text-center text-neutral-200">Difficulty</div>
                        <div className="col-span-4 text-neutral-200">Tags</div>
                        <div className="col-span-2 text-center text-neutral-200">Actions</div>
                    </div>
                    
                    {/* Problems List */}
                    <div 
                        className="custom-scrollbar divide-y divide-neutral-700"
                        style={{ maxHeight: '60vh', overflowY: 'auto' }}
                    >
                        {filteredProblems.length > 0 ? (
                            filteredProblems.map((val) => (
                                <div 
                                    key={val?._id} 
                                    className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-neutral-700 hover:bg-neutral-800 transition-colors"
                                >
                                    <div className="col-span-4 flex items-center">
                                        <Link to={`/problem/${val?._id}`} className="text-white hover:text-gray-300">
                                            <span className="truncate">{val?.title}</span>
                                        </Link>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            val?.difficultyLevel === 'easy' 
                                                ? 'bg-green-900 text-green-300' 
                                                : val?.difficultyLevel === 'medium' 
                                                    ? 'bg-yellow-900 text-yellow-300' 
                                                    : 'bg-red-900 text-red-300'
                                        }`}>
                                            {val?.difficultyLevel}
                                        </span>
                                    </div>
                                    <div className="col-span-4 flex flex-wrap gap-1 items-center">
                                        {val?.tags?.map((tag, index) => (
                                            <span key={index} className="px-2 py-0.5 bg-neutral-700 text-neutral-200 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center gap-2">
                                        <Link to={`/admin/updateProblem/${val?._id}`}>
                                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center gap-1">
                                                <Edit className="h-4 w-4" />
                                                Update
                                            </button>
                                        </Link>
                                        <Link to={`/admin/deleteProblem/${val?._id}`}>
                                            <button className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-lg text-sm hover:from-red-700 hover:to-rose-700 transition-colors flex items-center gap-1">
                                                <Trash className="h-4 w-4" />
                                                Delete
                                            </button>
                                        </Link>
                                    </div>
                                </div>
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
    );
}