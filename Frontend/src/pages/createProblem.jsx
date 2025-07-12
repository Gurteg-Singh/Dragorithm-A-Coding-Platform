import ProblemForm from "../components/problemForm"

export default function CreateProblem(){
    
    const data = {
        title : "",
        description : "",
        difficultyLevel : "",
        tags : [],
        visibleTestCases :[
            {
                input : "",
                output : "",
                explanation : ""
            }
        ],
        hiddenTestCases :[
            {
                input : "",
                output : ""
            }
        ],
        code : [
            {
                boilerPlateCode : ""
            },
            {
                boilerPlateCode : ""
            },
            {
                boilerPlateCode : ""
            }
        ],
        solution : [
            {
                codeSolution : ""
            },
            {
                codeSolution : ""
            },
            {
                codeSolution : ""
            }
        ]
    }

    return(
        <div>
            <ProblemForm data={data}/>
        </div>
    )
}