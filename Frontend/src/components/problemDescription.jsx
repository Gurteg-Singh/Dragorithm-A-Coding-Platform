import { useOutletContext } from "react-router";

export default function ProblemDescription(){

    const data = useOutletContext();
    return(
        <div>
            <div>{data?.title}</div>
            <div>{data?.difficultyLevel}</div>
        </div>
    )
}