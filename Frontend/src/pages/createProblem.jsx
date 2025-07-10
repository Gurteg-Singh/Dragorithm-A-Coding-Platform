import { useForm ,useFieldArray} from "react-hook-form";
export default function CreateProblem(){
    const {register,handleSubmit,formState : {errors},control} = useForm({
        defaultValues:{
            visibleTestCases : [
                {input : "",output:"",explanation:""}
            ],
            hiddenTestCases :[
                {input : "",output:""}
            ]
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
    
    const validTags = ["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming","Strings"];

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
                        <textarea {...register(`code.0`)} id="c++BoilerPlate"></textarea>
                    </div>
                    <div>
                        <label htmlFor="javaBoilerPlate">Java :</label>
                        <textarea {...register(`code.1`)} id="javaBoilerPlate"></textarea>
                    </div>
                    <div>
                        <label htmlFor="jsBoilerPlate">Javascript :</label>
                        <textarea {...register(`code.2`)} id="jsBoilerPlate"></textarea>
                    </div>
                </div>
                {/*Solution CODE*/}
                <div>
                    <div>
                        <label htmlFor="c++Solution">C++ Solution :</label>
                        <textarea {...register(`solution.0`)} id="c++Solution"></textarea>
                    </div>
                    <div>
                        <label htmlFor="javaSolution">Java Solution :</label>
                        <textarea {...register(`solution.0`)} id="javaSolution"></textarea>
                    </div>
                    <div>
                        <label htmlFor="jsSolution">Javascript Solution :</label>
                        <textarea {...register(`solution.0`)} id="jsSolution"></textarea>
                    </div>
                </div>
                <button type="submit">Create Problem</button>
            </form>
        </div>
    )
}