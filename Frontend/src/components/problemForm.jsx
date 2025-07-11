import { useForm ,useFieldArray} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


export default function ProblemForm({data}){

    const validTags = ["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming","Strings"];

    const createProblemSchema = z.object({
        title : z.string().min(1,'Title is required'),
        description : z.string().min(1,'Description is required'),
        difficultyLevel : z.string().enum(["easy","medium","hard"]),
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
        ),
        solution : z.array(
            z.object({
                codeSolution : z.string().min(1,"Boiler Plate Code is required")
            })
        ),
    });

    const {register,handleSubmit,formState : {errors},control} = useForm({
        defaultValues:{
            title : data?.title,
            description : data?.description,
            difficultyLevel : data?.difficultyLevel,
            tags: data?.tags,
            visibleTestCases : data?.visibleTestCases,
            hiddenTestCases   : data?.hiddenTestCases,
            code : data?.code,
            solution : data?.solution
        }
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

    return(
        <div>
            <form onSubmit={handleSubmit()}>
                {/*TITLE*/}
                <div>
                    <label htmlFor="title">Title : </label>
                    <input {...register("title")} id="title"/>
                </div>
                {/*DESCRIPTION*/}
                <div>
                    <label htmlFor="description">Description : </label>
                    <input {...register("description")} id="description"/>
                </div>
                {/*DIFFICULTY LEVEL*/}
                <div>
                    <label htmlFor="difficultyLevel">Difficulty Level : </label>
                    <select {...register("difficultyLevel")} id="difficultyLevel">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {/*TAGS*/}
                <div>
                    <label htmlFor="tags">Select Tags : </label>
                    {
                        validTags.map((val)=>{
                            return(
                                <div key={val}>
                                    <label htmlFor={val}>{val}</label>
                                    <input type="checkbox" id={val} {...register('tags')} value={val}/>
                                </div>
                            )
                        })
                    }
                </div>
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
                                            <textarea {...register(`visibleTestCases.${index}.input`)} id="vtcI"></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="vtcO">Output : </label>
                                            <textarea {...register(`visibleTestCases.${index}.output`)} id="vtcO"></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="vtcE">Explanation : </label>
                                            <textarea {...register(`visibleTestCases.${index}.explanation`)} id="vtcE"></textarea>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={()=>{visibleAppend({input : "",output:"",explanation:""})}}>Add</button>
                        <button type="button" onClick={()=>{visibleRemove(visibleFields.length - 1)}}>Remove</button>
                    </div>
                </div>
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
                                            <textarea {...register(`hiddenTestCases.${index}.input`)} id="htcI"></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="htcO">Output : </label>
                                            <textarea {...register(`hiddenTestCases.${index}.output`)} id="htcO"></textarea>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={()=>{hiddenAppend({input : "",output:"",explanation:""})}}>Add</button>
                        <button type="button" onClick={()=>{hiddenRemove(hiddenFields.length - 1)}}>Remove</button>
                    </div>
                </div>
                {/*BOILER PLATE CODE*/}
                <div>
                    <div>
                        <label htmlFor="c++BoilerPlate">C++ :</label>
                        <textarea {...register(`code.0.boilerPlateCode`)} id="c++BoilerPlate"></textarea>
                    </div>
                    <div>
                        <label htmlFor="javaBoilerPlate">Java :</label>
                        <textarea {...register(`code.1.boilerPlateCode`)} id="javaBoilerPlate"></textarea>
                    </div>
                    <div>
                        <label htmlFor="jsBoilerPlate">Javascript :</label>
                        <textarea {...register(`code.2.boilerPlateCode`)} id="jsBoilerPlate"></textarea>
                    </div>
                </div>
                {/*Solution CODE*/}
                <div>
                    <div>
                        <label htmlFor="c++Solution">C++ Solution :</label>
                        <textarea {...register(`solution.0.codeSolution`)} id="c++Solution"></textarea>
                    </div>
                    <div>
                        <label htmlFor="javaSolution">Java Solution :</label>
                        <textarea {...register(`solution.1.codeSolution`)} id="javaSolution"></textarea>
                    </div>
                    <div>
                        <label htmlFor="jsSolution">Javascript Solution :</label>
                        <textarea {...register(`solution.2.codeSolution`)} id="jsSolution"></textarea>
                    </div>
                </div>
                <button type="submit">Create Problem</button>
            </form>
        </div>
    )
}