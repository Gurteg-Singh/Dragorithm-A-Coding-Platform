import {useState, useEffect} from "react";
import {useParams} from "react-router";
import axiosClient from "../utils/axiosClient";

export default function SubmitCode({editorRef, lang, problem}){
    const params = useParams();
    const problem_id = params.id;
    const language = lang;
    const code = editorRef.current.getValue();
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function subCode(){
            try {
                const response = await axiosClient.post(`/submission/submit/${problem_id}`, {language, code});
                setResult(response?.data);
            } catch (error) {
                console.error("Submission error:", error);
                setResult({
                    status: "Error",
                    errorMessage: "Failed to submit solution. Please try again."
                });
            }
        }
        subCode();
    }, []);

    if(!result){
        return(
            <div className="h-full w-full bg-neutral-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-300 text-lg">Submitting your solution...</p>
                </div>
            </div>
        )
    }

    function Passed({data}){
        return (
            <div className="p-6 space-y-6">
                <div className="text-center">
                    <div className="text-4xl text-green-500 mb-2">✓</div>
                    <h2 className="text-2xl font-bold text-green-500">Accepted</h2>
                    <p className="text-gray-400 mt-1">Your solution passed all test cases</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-750 rounded-lg p-4 text-center">
                        <p className="text-gray-400">Test Cases</p>
                        <p className="text-2xl text-green-400 font-bold">{data?.testCasesPassed}/{data?.testCasesTotal}</p>
                    </div>
                    
                    <div className="bg-neutral-750 rounded-lg p-4 text-center">
                        <p className="text-gray-400">Runtime</p>
                        <p className="text-2xl text-blue-400 font-bold">{data?.runtime || 'N/A'} ms</p>
                    </div>
                    
                    <div className="bg-neutral-750 rounded-lg p-4 text-center">
                        <p className="text-gray-400">Memory</p>
                        <p className="text-2xl text-purple-400 font-bold">{data?.memory || 'N/A'} bytes</p>
                    </div>
                </div>
            </div>
        )
    }

    function ShowE({data}){
        return (
            <div className="p-6">
                <div className="text-center mb-6">
                    <div className="text-4xl text-red-500 mb-2">✗</div>
                    <h2 className="text-2xl font-bold text-red-500">Error</h2>
                </div>
                
                <div className="bg-neutral-750 rounded-lg p-4">
                    <h3 className="text-gray-300 font-medium mb-2">Error Message</h3>
                    <pre className="bg-neutral-850 p-4 rounded text-red-400 overflow-x-auto">
                        {data?.errorMessage || "Unknown error occurred"}
                    </pre>
                </div>
            </div>
        )
    }

    function ShowFI({data}){
        return (
            <div className="p-6 space-y-6">
                <div className="text-center">
                    <div className="text-4xl text-yellow-500 mb-2">⚠️</div>
                    <h2 className="text-2xl font-bold text-yellow-500">{data?.status || "Test Failed"}</h2>
                    <p className="text-gray-400 mt-1">
                        Passed {data?.testCasesPassed}/{data?.testCasesTotal} test cases
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-750 rounded-lg p-4 text-center">
                        <p className="text-gray-400">Test Cases</p>
                        <p className="text-2xl text-yellow-400 font-bold">{data?.testCasesPassed}/{data?.testCasesTotal}</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-neutral-750 rounded-lg p-4">
                        <h3 className="text-gray-300 font-medium mb-2">Failed Input</h3>
                        <pre className="bg-neutral-850 p-3 rounded text-sm text-gray-200 overflow-x-auto">
                            {data?.failedInput || "No input provided"}
                        </pre>
                    </div>
                    
                    <div className="bg-neutral-750 rounded-lg p-4">
                        <h3 className="text-gray-300 font-medium mb-2">Your Output</h3>
                        <pre className="bg-neutral-850 p-3 rounded text-sm text-red-300 overflow-x-auto">
                            {data?.failedOutput || "No output produced"}
                        </pre>
                    </div>
                    
                    <div className="bg-neutral-750 rounded-lg p-4">
                        <h3 className="text-gray-300 font-medium mb-2">Expected Output</h3>
                        <pre className="bg-neutral-850 p-3 rounded text-sm text-green-300 overflow-x-auto">
                            {data?.failedExpectedOutput || "No expected output"}
                        </pre>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="h-full w-full bg-neutral-800 overflow-y-auto">
            {
                result?.status === "Accepted" ? 
                <Passed data={result} />
                : result?.errorMessage ? 
                <ShowE data={result} />
                : <ShowFI data={result} />
            }
        </div>
    )
}