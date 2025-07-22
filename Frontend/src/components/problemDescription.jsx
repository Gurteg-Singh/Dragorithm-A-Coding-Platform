import { useOutletContext } from "react-router";
import { useEffect } from "react";

export default function ProblemDescription() {
    const problem = useOutletContext();
    
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


    // Function to determine difficulty color
    const getDifficultyColor = () => {
        switch(problem?.difficultyLevel?.toLowerCase()) {
            case 'easy': return 'bg-green-900 text-green-300';
            case 'medium': return 'bg-yellow-900 text-yellow-300';
            case 'hard': return 'bg-red-900 text-red-300';
            default: return 'bg-gray-700 text-gray-300';
        }
    };

    return (
        <div className="custom-scrollbar flex flex-col gap-6 p-4 text-gray-200 bg-neutral-800 h-full overflow-y-auto">
            {/* Title and Difficulty */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-700">
                <h1 className="text-2xl font-bold text-white">{problem?.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor()}`}>
                    {problem?.difficultyLevel}
                </span>
            </div>

            {/* Problem Description */}
            <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 bg-neutral-750 p-4 rounded-lg">
                    {problem?.description}
                </div>
            </div>

            {/* Examples Section */}
            {problem?.visibleTestCasesForUser?.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-white">Examples</h2>
                    
                    {problem.visibleTestCasesForUser.map((val, index) => (
                        <div key={index} className="bg-neutral-750 rounded-lg p-4 border border-neutral-700">
                            <p className="text-lg font-medium text-indigo-300 mb-3">Example {index + 1}</p>
                            
                            {/* Input Section */}
                            <div className="flex flex-col mb-3">
                                <span className="font-medium text-gray-300 mb-1">Input:</span>
                                <pre className="bg-neutral-850 p-3 rounded text-sm text-gray-200 overflow-x-auto">
                                    {val?.input}
                                </pre>
                            </div>
                            
                            {/* Output Section */}
                            <div className="flex flex-col mb-3">
                                <span className="font-medium text-gray-300 mb-1">Output:</span>
                                <pre className="bg-neutral-850 p-3 rounded text-sm text-gray-200 overflow-x-auto">
                                    {val?.output}
                                </pre>
                            </div>
                            
                            {/* Explanation Section */}
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-300 mb-1">Explanation:</span>
                                <div className="bg-neutral-850 p-3 rounded text-sm text-gray-300">
                                    {val?.explanation}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tags Section */}
            {problem?.tags?.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold text-white mb-3">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {problem.tags.map((val, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1.5 bg-indigo-900/30 text-indigo-300 rounded-full text-sm font-medium"
                            >
                                {val}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}