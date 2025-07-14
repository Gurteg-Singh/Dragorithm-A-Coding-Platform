import { useForm ,useFieldArray} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axiosClient from "../utils/axiosClient";
import { useSelector } from "react-redux";


export default function ProblemForm({data}){

    const validTags = ["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming","Strings"];

    const{user,isAuthenticated} = useSelector((state)=>state.auth)

    const createProblemSchema = z.object({
        title : z.string().min(1,'Title is required'),
        description : z.string().min(1,'Description is required'),
        difficultyLevel : z.enum(["easy","medium","hard"]),
        tags: z.array(z.enum(validTags)).min(1, "Select at least one tag"),
        visibleTestCases : z.array(
            z.object({
                input : z.string().min(1,"Input is required"),
                output : z.string().min(1,"Input is required"),
                explanation : z.string().min(1,"Input is required")
            })
        ).min(1,"Minimum one test case is required"),
        hiddenTestCases : z.array(
            z.object({
                input : z.string().min(1,"Input is required"),
                output : z.string().min(1,"Input is required"),
            })
        ).min(1,"Minimum one test case is required"),
        code : z.array(
            z.object({
                boilerPlateCode : z.string().min(1,"Boiler Plate Code is required")
            })
        ).min(3,"BOILER PLATE of ALL LANGUAGES is required"),
        solution : z.array(
            z.object({
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
                visibleTestCases : data?.visibleTestCases || {input : "",output: "",explanation : ""},
                hiddenTestCases  : data?.hiddenTestCases || {input : "",output : ""},
                code : data?.code || [{boilerPlateCode:""},{boilerPlateCode:""},{boilerPlateCode:""}],
                solution : data?.solution || [{codeSolution:""},{codeSolution:""},{codeSolution:""}]
            },
    });

    const {fields : visibleFields,
        append : visibleAppend,
        remove : visibleRemove
    } = useFieldArray({
        control,
        name : "visibleTestCases"
    });

    const {fields : hiddenFields,
        append : hiddenAppend,
        remove : hiddenRemove
    } = useFieldArray({
        control,
        name : "hiddenTestCases"
    });

    async function saveProblem(data){
        const d = {...data ,
                    problemCreator : user._id,
                    code :[
                        {...data.code[0] , language : "c++"},
                        {...data.code[1],langaue : "java"},
                        {...data.code[2],langaue : "javascript"}
                    ],
                    solution :[
                        {...data.solution[0],langaue : "c++"},
                        {...data.solution[1],langaue : "java"},
                        {...data.solution[2],langaue : "javascript"}
                    ]
                }
        const response = await axiosClient.post('/problem/create',d);
        alert(response);
    }

    return(
        <div className="w-full h-screen flex flex-col p-1">
            <form onSubmit={handleSubmit(saveProblem)} className="w-[90]% flex flex-col justify-start items-start pt-6 pl-6 gap-3">
                {/*TITLE*/}
                <div>
                    <label htmlFor="title">Title : </label>
                    <input {...register("title")} id="title" className="border-1 border-black"/>
                </div>
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}

                {/*DESCRIPTION*/}
                <div>
                    <label htmlFor="description">Description : </label>
                    <input {...register("description")} id="description" className="border-1 border-black"/>
                </div>
                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}

                {/*DIFFICULTY LEVEL*/}
                <div>
                    <label htmlFor="difficultyLevel">Difficulty Level : </label>
                    <select {...register("difficultyLevel")} id="difficultyLevel" className="border-1 border-black">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {errors.difficultyLevel && (
                    <p className="mt-1 text-sm text-red-500">{errors.difficultyLevel?.message}</p>
                )}

                {/*TAGS*/}
                <div>
                    <label htmlFor="tags">Select Tags</label>
                    <div className="flex justify-start items-center gap-3">
                        {
                            validTags.map((val)=>{
                                return(
                                    <div key={val} className="flex justify-center items-center">
                                        <input type="checkbox" id={val} {...register('tags')} value={val} className="mt-1 mr-1"/>
                                        <label htmlFor={val}>{val}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {errors.tags && (
                    <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
                )}

                {/*VISIBLE TEST CASES*/}
                <div>
                    <label>Visible Test Cases : </label>
                    <div>
                        {
                            visibleFields.map((field,index)=>{
                                return(
                                    <div key={field.id}>
                                        <div>
                                            <label htmlFor="vtcI">Input : </label>
                                            <textarea {...register(`visibleTestCases.${index}.input`)} id="vtcI" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                                        </div>
                                        {errors.visibleTestCases?.[index]?.input && (
                                            <p className="mt-1 text-sm text-red-500">{errors.visibleTestCases?.[index]?.input.message}</p>
                                        )}

                                        <div>
                                            <label htmlFor="vtcO">Output : </label>
                                            <textarea {...register(`visibleTestCases.${index}.output`)} id="vtcO" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                                        </div>
                                        {errors.visibleTestCases?.[index]?.output && (
                                            <p className="mt-1 text-sm text-red-500">{errors.visibleTestCases?.[index]?.output.message}</p>
                                        )}
                                        
                                        <div>
                                            <label htmlFor="vtcE">Explanation : </label>
                                            <textarea {...register(`visibleTestCases.${index}.explanation`)} id="vtcE" rows={8} cols={50} className="overflow-scroll border-1 border-black"></textarea>
                                        </div>
                                        {errors.visibleTestCases?.[index]?.explanation && (
                                            <p className="mt-1 text-sm text-red-500">{errors.visibleTestCases?.[index]?.explanation.message}</p>
                                        )}
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={()=>{visibleAppend({input : "",output:"",explanation:""})}} className="bg-red-600 text-white w-16 p-1 mr-3">Add</button>
                        <button type="button" onClick={()=>{visibleRemove(visibleFields.length - 1)}} className="bg-blue-500 text-white w-16 p-1">Remove</button>
                    </div>
                </div>
                {errors.visibleTestCases && (
                    <p className="mt-1 text-sm text-red-500">{errors.visibleTestCases.message}</p>
                )}

                {/*HIDDEN TEST CASES*/}
                <div>
                    <label>Hidden Test Cases : </label>
                    <div>
                        {
                            hiddenFields.map((field,index)=>{
                                return(
                                    <div key={field.id}>
                                        <div>
                                            <label htmlFor="htcI">Input : </label>
                                            <textarea {...register(`hiddenTestCases.${index}.input`)} id="htcI" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                                        </div>
                                        {errors.hiddenTestCases?.[index]?.input && (
                                            <p className="mt-1 text-sm text-red-500">{errors.hiddenTestCases?.[index]?.input.message}</p>
                                        )}

                                        <div>
                                            <label htmlFor="htcO">Output : </label>
                                            <textarea {...register(`hiddenTestCases.${index}.output`)} id="htcO" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                                        </div>
                                        {errors.hiddenTestCases?.[index]?.output && (
                                            <p className="mt-1 text-sm text-red-500">{errors.hiddenTestCases?.[index]?.output.message}</p>
                                        )}
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={()=>{hiddenAppend({input : "",output:"",explanation:""})}} className="bg-red-600 text-white w-16 p-1 mr-3">Add</button>
                        <button type="button" onClick={()=>{hiddenRemove(hiddenFields.length - 1)}} className="bg-blue-500 text-white w-16 p-1">Remove</button>
                    </div>
                </div>
                {errors.hiddenTestCases && (
                    <p className="mt-1 text-sm text-red-500">{errors.hiddenTestCases.message}</p>
                )}

                {/*BOILER PLATE CODE*/}
                <div>
                    <h3> Boiler Plate code : </h3>
                    <div>
                        <label htmlFor="c++BoilerPlate">C++ :</label>
                        <textarea {...register(`code.0.boilerPlateCode`)} id="c++BoilerPlate" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                    </div>
                    {errors.code?.[0]?.boilerPlateCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.code?.[0]?.boilerPlateCode.message}</p>
                    )}

                    <div>
                        <label htmlFor="javaBoilerPlate">Java :</label>
                        <textarea {...register(`code.1.boilerPlateCode`)} id="javaBoilerPlate" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                    </div>
                    {errors.code?.[1]?.boilerPlateCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.code?.[1]?.boilerPlateCode.message}</p>
                    )}

                    <div>
                        <label htmlFor="jsBoilerPlate">Javascript :</label>
                        <textarea {...register(`code.2.boilerPlateCode`)} id="jsBoilerPlate" rows={10} cols={30} className="overflow-scroll border-1 border-black"></textarea>
                    </div>
                    {errors.code?.[2]?.boilerPlateCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.code?.[2]?.boilerPlateCode.message}</p>
                    )}
                </div>
                {errors.code && (
                    <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
                )}

                {/*Solution CODE*/}
                <div>
                    <div>
                        <label htmlFor="c++Solution">C++ Solution :</label>
                        <textarea {...register(`solution.0.codeSolution`)} id="c++Solution" rows={20} cols={50} className="overflow-scroll border-1 border-black"></textarea>
                    </div>
                    {errors.solution?.[0]?.codeSolution && (
                        <p className="mt-1 text-sm text-red-500">{errors.solution?.[0]?.codeSolution.message}</p>
                    )}

                    <div>
                        <label htmlFor="javaSolution">Java Solution :</label>
                        <textarea {...register(`solution.1.codeSolution`)} id="javaSolution" rows={20} cols={50} className="overflow-scroll border-1 border-black"></textarea>
                    </div>
                    {errors.solution?.[1]?.codeSolution && (
                        <p className="mt-1 text-sm text-red-500">{errors.solution?.[1]?.codeSolution.message}</p>
                    )}

                    <div>
                        <label htmlFor="jsSolution">Javascript Solution :</label>
                        <textarea {...register(`solution.2.codeSolution`)} id="jsSolution" rows={20} cols={50} className="overflow-scroll border-1 border-black"></textarea>
                    </div>
                    {errors.solution?.[2]?.codeSolution && (
                        <p className="mt-1 text-sm text-red-500">{errors.solution?.[2]?.codeSolution.message}</p>
                    )}
                </div>
                {errors.solution && (
                    <p className="mt-1 text-sm text-red-500">{errors.solution.message}</p>
                )}

                <button type="submit" className="bg-green-500 w-64 p-2 mb-4">Create Problem</button>
            </form>
        </div>
    )
}