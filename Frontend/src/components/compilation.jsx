import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";

export default function Compilation({ editorRef, lang, problem }) {
    const params = useParams();
    const problem_id = params.id;
    const code = editorRef.current.getValue();
    const language = lang;
    const testcases = problem?.visibleTestCasesForUser;

    const [results, setResults] = useState([]);

    useEffect(() => {
        async function runCode() {
            const response = await axiosClient.post(`/submission/run/${problem_id}`, { code, language });
            setResults(response?.data || []);
        }
        runCode();
    }, []);

    if (results.length === 0) {
        return (
            <div className="h-full w-full bg-neutral-800 flex justify-center items-center">
                <p className="text-white text-xl animate-pulse">Compiling your code...</p>
            </div>
        )
    }

    function ShowE({ data }) {
        return (
            <div className="h-full w-full p-6">
                <div className="bg-neutral-750 rounded-lg p-4">
                    <h3 className="text-red-500 text-lg font-medium mb-2">Compilation Error</h3>
                    <pre className="text-gray-300 bg-neutral-850 p-3 rounded text-sm whitespace-pre-wrap">
                        {data[0]?.compile_output}
                    </pre>
                </div>
            </div>
        )
    }

    function ShowIO({ data, testcases }) {
        const isAccepted = data[0]?.status?.description === "Accepted";
        
        return (
            <div className="h-full w-full p-6 space-y-6">
                <div className={`text-xl font-medium p-3 rounded-lg ${isAccepted ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {isAccepted ? "✓ Accepted" : "✗ Wrong Answer"}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-750 rounded-lg p-4">
                        <h3 className="text-gray-300 font-medium mb-2">Input</h3>
                        <pre className="text-gray-200 bg-neutral-850 p-3 rounded text-sm">
                            {testcases[0]?.input || "No input provided"}
                        </pre>
                    </div>

                    <div className="bg-neutral-750 rounded-lg p-4">
                        <h3 className="text-gray-300 font-medium mb-2">Expected Output</h3>
                        <pre className="text-gray-200 bg-neutral-850 p-3 rounded text-sm">
                            {data[0]?.expected_output || "No expected output"}
                        </pre>
                    </div>

                    <div className="bg-neutral-750 rounded-lg p-4 md:col-span-2">
                        <h3 className="text-gray-300 font-medium mb-2">Your Output</h3>
                        <pre className={`p-3 rounded text-sm ${isAccepted ? 'bg-green-900/20 text-green-200' : 'bg-red-900/20 text-red-200'}`}>
                            {data[0]?.stdout || "No output produced"}
                        </pre>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full bg-neutral-800 overflow-y-auto">
            {results[0]?.compile_output 
                ? <ShowE data={results} testcases={testcases} /> 
                : <ShowIO data={results} testcases={testcases} />
            }
        </div>
    )
}