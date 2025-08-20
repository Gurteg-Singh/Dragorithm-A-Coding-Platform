import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import axiosClient from "../utils/axiosClient";
import { X } from "lucide-react";

export default function ProblemSubmissions() {
    const { problem } = useOutletContext();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [code,setcode] = useState(null);

    useEffect(() => {
        setLoading(true);
        async function fetchSubmissions() {
            try {
                const response = await axiosClient.get(`/problem/solutionsOfProblem/${problem?._id}`);
                setSubmissions(
                    response?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                );
            } catch (err) {
                setError(err?.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchSubmissions();
    }, [problem]);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white text-xl">Loading submissions...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
            <div className="bg-neutral-800 p-4 border-b border-neutral-700">
                <h2 className="text-lg font-bold text-white">My Submissions</h2>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 p-3 border-b border-neutral-700 bg-neutral-800">
                    <div className="col-span-4 font-medium text-neutral-300">Time</div>
                    <div className="col-span-2 font-medium text-neutral-300">Status</div>
                    <div className="col-span-3 font-medium text-neutral-300">Language</div>
                    <div className="col-span-2 font-medium text-neutral-300">Test Cases</div>
                    <div className="col-span-1 font-medium text-neutral-300">Code</div>
                </div>
                
                {/* Table Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {submissions.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-neutral-400">No submissions found</p>
                        </div>
                    ) : (
                        submissions.map((val, index) => (
                            <div 
                                key={index}
                                className={`grid grid-cols-12 gap-2 p-3 ${
                                    index % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-900/50'
                                } hover:bg-neutral-800 transition-colors`}
                            >
                                <div className="col-span-4 text-neutral-300 text-sm">
                                    {new Date(val?.createdAt).toLocaleString()}
                                </div>
                                <div className={`col-span-2 font-medium ${
                                    val?.status === 'Accepted' ? "text-green-500" : "text-red-500"
                                }`}>
                                    {val?.status}
                                </div>
                                <div className="col-span-3 text-neutral-300">
                                    {val?.language}
                                </div>
                                <div className="col-span-2 text-neutral-300">
                                    {val?.testCasesPassed}/{val?.testCasesTotal}
                                </div>
                                <div className="col-span-1">
                                    <button onClick={()=>{setcode(val?.code)}} className="text-blue-400 hover:text-blue-300 transition-colors">
                                        View
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {code && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-4xl w-full max-h-[80vh] flex flex-col shadow-xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-700">
                            <h3 className="text-xl font-bold text-white">Submitted Code</h3>
                            <button 
                                onClick={() => setcode(null)} 
                                className="p-1 hover:bg-neutral-700 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6 text-neutral-400 hover:text-white" />
                            </button>
                        </div>
                        
                        {/* Code Content */}
                        <div className="flex-1 overflow-auto bg-neutral-900 rounded-lg p-4">
                            <pre className="text-sm text-neutral-200 whitespace-pre-wrap font-mono">
                                <code>{code}</code>
                            </pre>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-neutral-700 flex justify-end">
                            <button 
                                onClick={() => setcode(null)} 
                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}