import { useOutletContext } from "react-router";

export default function ProblemDescription(){

    const data = useOutletContext();
    return(
        <div className="flex flex-col gap-4">
            <div>{data?.title}</div>
            <div>{data?.difficultyLevel}</div>
            <div>{data?.ProblemDescription}</div>
            <div className="flex flex-col gap-3">
                {
                    data?.visibleTestCases?.map((val,index)=>{
                        return(
                            <div key={index} className="flex flex-col gap-2">
                                <p>Example {index+1}</p>
                                <div>Input : {val?.input}</div>
                                <div>Output : {val?.output}</div>
                                <div>Explanation : {val?.explanation}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p>Company Tags</p>
                {
                    data?.tags?.map((val,index)=>{
                        return(
                            <div className="p-2 border-1 border-white" key={index}>
                                {val}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}