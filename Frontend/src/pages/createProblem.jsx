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
                output : ""
            }
        ],
        visibleTestCasesForUser :[
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
                language : "C++",
                boilerPlateCode : ""
            },
            {
                language : "Java",
                boilerPlateCode : ""
            },
            {
                language : "Javascript",
                boilerPlateCode : ""
            }
        ],
        solution : [
            {
                language : "C++",
                codeSolution : ""
            },
            {
                language : "Java",
                codeSolution : ""
            },
            {
                language : "Javascript",
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
