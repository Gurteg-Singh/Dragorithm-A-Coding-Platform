import { useForm } from "react-hook-form";
export default function CreateProblem(){
    const {register,handleSubmit,formstate : {errors}} = useForm();
    
    
    const validTags = ["Arrays","Linked List","Graphs","Stacks","Queues","Binary Trees","Binary Search Trees","Dynamic Programming","Strings"];

    return(
        <div>
            <div>
                <label htmlFor="title">Title : </label>
                <input {...register("title")} id="title"/>
            </div>
            <div>
                <label htmlFor="description">Description : </label>
                <input {...register("description")} id="description"/>
            </div>
            <div>
                <label htmlFor="difficultyLevel">Difficulty Level : </label>
                <select {...register("difficultyLevel")} id="difficultyLevel">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
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
        </div>
    )
}