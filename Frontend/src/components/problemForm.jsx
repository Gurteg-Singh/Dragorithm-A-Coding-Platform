import { useForm ,useFieldArray} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function ProblemForm({data}){

    const [error,seterror] = useState(null);
    const [success,setsuccess] = useState(null);
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();

    function leavePage(){
        setsuccess(null);
        navigate('/allProblems');
    }

    const validTags = ["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming","Strings"];
    const languages = ["C++","Java","Javascript"];
    const createProblemSchema = z.object({
        title : z.string().min(1,'Title is required'),
        description : z.string().min(1,'Description is required'),
        difficultyLevel : z.enum(["easy","medium","hard"]),
        tags: z.array(z.enum(validTags)).min(1, "Select at least one tag"),
        visibleTestCases : z.array(
            z.object({
                input : z.string().min(1,"Input is required"),
                output : z.string().min(1,"Output is required")
            })
        ).min(1,"Minimum one test case is required"),
        visibleTestCasesForUser : z.array(
            z.object({
                input : z.string().min(1,"Input is required"),
                output : z.string().min(1,"Output is required"),
                explanation : z.string().min(1,"Explanation is required")
            })
        ).min(1,"Minimum one test case is required"),
        hiddenTestCases : z.array(
            z.object({
                input : z.string().min(1,"Input is required"),
                output : z.string().min(1,"Output is required"),
            })
        ).min(1,"Minimum one test case is required"),
        code : z.array(
            z.object({
                language : z.enum(["C++","Java","Javascript"]),
                boilerPlateCode : z.string().min(1,"Boiler Plate Code is required")
            })
        ).min(3,"BOILER PLATE of ALL LANGUAGES is required"),
        solution : z.array(
            z.object({
                language : z.enum(["C++","Java","Javascript"]),
                codeSolution : z.string().min(1,"Boiler Plate Code is required")
            })
        ).min(3,"SOLUTION CODE of ALL LANGUAGES is required"),
    });

    const {register,handleSubmit,formState : {errors},control} = useForm(
        {
            resolver : zodResolver(createProblemSchema),
            defaultValues:{
                title : data?.title || "",
                description : data?.description || "",
                difficultyLevel : data?.difficultyLevel || "",
                tags: data?.tags || [],
                visibleTestCases : data?.visibleTestCases || [{input : "",output: "",explanation : ""}],
                visibleTestCasesForUser : data?.visibleTestCasesForUser || [{input : "",output: ""}],
                hiddenTestCases  : data?.hiddenTestCases || [{input : "",output : ""}],
                code : data?.code || [{language : "C++",boilerPlateCode:""},{language : "Java",boilerPlateCode:""},{language : "Javascript",boilerPlateCode:""}],
                solution : data?.solution || [{language : "C++",codeSolution:""},{language : "Java",codeSolution:""},{language : "Javascript",codeSolution:""}]
            },
    });

    const {fields : visibleFields,
        append : visibleAppend,
        remove : visibleRemove
    } = useFieldArray({
        control,
        name : "visibleTestCases"
    });

    const {fields : visibleUserFields,
        append : visibleUserAppend,
        remove : visibleUserRemove
    } = useFieldArray({
        control,
        name : "visibleTestCasesForUser"
    });

    const {fields : hiddenFields,
        append : hiddenAppend,
        remove : hiddenRemove
    } = useFieldArray({
        control,
        name : "hiddenTestCases"
    });

    async function saveProblem(d){
        setloading(true);
        try{
            if(data?.title === ""){
                const result = await axiosClient.post('/problem/create',d);
                setloading(false);
                setsuccess("Problem was created successfully.");
            }else{
                const result = await axiosClient.patch(`/problem/update/${data?._id}`,d);
                setloading(false);
                setsuccess("Problem was updated successfully.");
            }
        }catch(err){
            seterror(err?.result?.data?.message || "Some Error Occured");
        }
    }

    return(
        <div className="min-h-screen bg-neutral-900 text-gray-100 p-4 sm:p-6">
            <form onSubmit={handleSubmit(saveProblem)} className="max-w-7xl mx-auto bg-neutral-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">
                    {data.title === "" ? "Create New Problem" : "Edit Problem"}
                </h2>
                
                {/* Basic Information Section */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block mb-2 font-medium">Title</label>
                            <input
                                {...register("title")}
                                id="title"
                                className={`w-full bg-gray-700 border ${errors.title ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Difficulty Level */}
                        <div>
                            <label htmlFor="difficultyLevel" className="block mb-2 font-medium">Difficulty Level</label>
                            <select
                                {...register("difficultyLevel")}
                                id="difficultyLevel"
                                className={`w-full bg-gray-700 border ${errors.difficultyLevel ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            >
                                <option value="">Select difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            {errors.difficultyLevel && (
                                <p className="mt-1 text-sm text-red-400">{errors.difficultyLevel.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block mb-2 font-medium">Description</label>
                            <textarea
                                {...register("description")}
                                id="description"
                                rows={4}
                                className={`w-full bg-gray-700 border ${errors.description ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium">Tags</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {validTags.map((val) => (
                                    <div key={val} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={val}
                                            {...register('tags')}
                                            value={val}
                                            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor={val} className="ml-2 text-sm">{val}</label>
                                    </div>
                                ))}
                            </div>
                            {errors.tags && (
                                <p className="mt-1 text-sm text-red-400">{errors.tags.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Test Cases Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-indigo-400">Test Cases</h3>
                    </div>

                    {/* Visible Test Cases */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-lg">Visible Test Cases</h4>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => visibleAppend({ input: "", output: "", explanation: "" })}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Add Test Case
                                </button>
                                <button
                                    type="button"
                                    onClick={() => visibleRemove(visibleFields.length - 1)}
                                    disabled={visibleFields.length <= 1}
                                    className={`${visibleFields.length <= 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white px-3 py-1 rounded-md text-sm`}
                                >
                                    Remove Last
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {visibleFields.map((field, index) => (
                                <div key={field.id} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Input</label>
                                        <textarea
                                            {...register(`visibleTestCases.${index}.input`)}
                                            rows={3}
                                            className={`w-full bg-gray-700 border ${errors.visibleTestCases?.[index]?.input ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                        />
                                        {errors.visibleTestCases?.[index]?.input && (
                                            <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases?.[index]?.input.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Output</label>
                                        <textarea
                                            {...register(`visibleTestCases.${index}.output`)}
                                            rows={3}
                                            className={`w-full bg-gray-700 border ${errors.visibleTestCases?.[index]?.output ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                        />
                                        {errors.visibleTestCases?.[index]?.output && (
                                            <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases?.[index]?.output.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.visibleTestCases && (
                            <p className="mt-2 text-sm text-red-400">{errors.visibleTestCases.message}</p>
                        )}
                    </div>

                    {/* Visible Test Cases For User*/}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-lg">Visible Test Cases For User Interface</h4>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => visibleUserAppend({ input: "", output: "", explanation: "" })}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Add Test Case
                                </button>
                                <button
                                    type="button"
                                    onClick={() => visibleUserRemove(visibleUserFields.length - 1)}
                                    disabled={visibleUserFields.length <= 1}
                                    className={`${visibleUserFields.length <= 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white px-3 py-1 rounded-md text-sm`}
                                >
                                    Remove Last
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {visibleUserFields.map((field, index) => (
                                <div key={field.id} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Input</label>
                                        <textarea
                                            {...register(`visibleTestCasesForUser.${index}.input`)}
                                            rows={3}
                                            className={`w-full bg-gray-700 border ${errors.visibleTestCasesForUser?.[index]?.input ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                        />
                                        {errors.visibleTestCasesForUser?.[index]?.input && (
                                            <p className="mt-1 text-sm text-red-400">{errors.visibleTestCasesForUser?.[index]?.input.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Output</label>
                                        <textarea
                                            {...register(`visibleTestCasesForUser.${index}.output`)}
                                            rows={3}
                                            className={`w-full bg-gray-700 border ${errors.visibleTestCasesForUser?.[index]?.output ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                        />
                                        {errors.visibleTestCasesForUser?.[index]?.output && (
                                            <p className="mt-1 text-sm text-red-400">{errors.visibleTestCasesForUser?.[index]?.output.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium">Explanation</label>
                                        <textarea
                                            {...register(`visibleTestCasesForUser.${index}.explanation`)}
                                            rows={2}
                                            className={`w-full bg-gray-700 border ${errors.visibleTestCasesForUser?.[index]?.explanation ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white`}
                                        />
                                        {errors.visibleTestCasesForUser?.[index]?.explanation && (
                                            <p className="mt-1 text-sm text-red-400">{errors.visibleTestCasesForUser?.[index]?.explanation.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.visibleTestCasesForUser && (
                            <p className="mt-2 text-sm text-red-400">{errors.visibleTestCasesForUser.message}</p>
                        )}
                    </div>

                    {/* Hidden Test Cases */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-lg">Hidden Test Cases</h4>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => hiddenAppend({ input: "", output: "" })}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Add Test Case
                                </button>
                                <button
                                    type="button"
                                    onClick={() => hiddenRemove(hiddenFields.length - 1)}
                                    disabled={hiddenFields.length <= 1}
                                    className={`${hiddenFields.length <= 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white px-3 py-1 rounded-md text-sm`}
                                >
                                    Remove Last
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {hiddenFields.map((field, index) => (
                                <div key={field.id} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 font-medium">Input</label>
                                            <textarea
                                                {...register(`hiddenTestCases.${index}.input`)}
                                                rows={3}
                                                className={`w-full bg-gray-700 border ${errors.hiddenTestCases?.[index]?.input ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                            />
                                            {errors.hiddenTestCases?.[index]?.input && (
                                                <p className="mt-1 text-sm text-red-400">{errors.hiddenTestCases?.[index]?.input.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-medium">Output</label>
                                            <textarea
                                                {...register(`hiddenTestCases.${index}.output`)}
                                                rows={3}
                                                className={`w-full bg-gray-700 border ${errors.hiddenTestCases?.[index]?.output ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                            />
                                            {errors.hiddenTestCases?.[index]?.output && (
                                                <p className="mt-1 text-sm text-red-400">{errors.hiddenTestCases?.[index]?.output.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.hiddenTestCases && (
                            <p className="mt-2 text-sm text-red-400">{errors.hiddenTestCases.message}</p>
                        )}
                    </div>
                </div>

                {/* Code Section */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-400">Code Setup</h3>
                    
                    {/* Boilerplate Code */}
                    <div className="mb-6">
                        <h4 className="font-medium text-lg mb-3">Boilerplate Code</h4>
                        <div className="space-y-4">
                            {languages.map((lang, index) => (
                                <div key={lang} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                                    <label className="block mb-2 font-medium">{lang} Boilerplate</label>
                                    <textarea
                                        {...register(`code.${index}.boilerPlateCode`)}
                                        rows={8}
                                        className={`w-full bg-gray-700 border ${errors.code?.[index]?.boilerPlateCode ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                    />
                                    {errors.code?.[index]?.boilerPlateCode && (
                                        <p className="mt-1 text-sm text-red-400">{errors.code?.[index]?.boilerPlateCode.message}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.code && (
                            <p className="mt-2 text-sm text-red-400">{errors.code.message}</p>
                        )}
                    </div>

                    {/* Solution Code */}
                    <div>
                        <h4 className="font-medium text-lg mb-3">Solution Code</h4>
                        <div className="space-y-4">
                            {languages.map((lang, index) => (
                                <div key={lang} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                                    <label className="block mb-2 font-medium">{lang} Solution</label>
                                    <textarea
                                        {...register(`solution.${index}.codeSolution`)}
                                        rows={10}
                                        className={`w-full bg-gray-700 border ${errors.solution?.[index]?.codeSolution ? "border-red-500" : "border-gray-600"} rounded-lg py-2 px-3 text-white font-mono text-sm`}
                                    />
                                    {errors.solution?.[index]?.codeSolution && (
                                        <p className="mt-1 text-sm text-red-400">{errors.solution?.[index]?.codeSolution.message}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.solution && (
                            <p className="mt-2 text-sm text-red-400">{errors.solution.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        disabled = {loading}
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg"
                    >
                        {data.title === "" ? "Create Problem" : "Update Problem"}
                    </button>
                </div>
            </form>

            {loading && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-md w-full shadow-xl">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="animate-spin">
                                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Processing</h3>
                            <p className="text-neutral-300">Please wait while we process your request...</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-md w-full shadow-xl">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Error</h3>
                            <p className="text-neutral-300">{error}</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={() => seterror(null)} 
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {success && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-md w-full shadow-xl">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Success</h3>
                            <p className="text-neutral-300">{success}</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={leavePage} 
                                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}