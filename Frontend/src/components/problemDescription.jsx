import { useOutletContext } from "react-router";

export default function ProblemDescription(){

    const {problem} = useOutletContext();
    return(
        <div className="flex flex-col gap-4">
            <div className="text-1xl text-white font-bold">{problem?.title}</div>
            <div>{problem?.difficultyLevel}</div>
            <div className="text-1xl text-white font-bold">{problem?.ProblemDescription}</div>
            <div className="flex flex-col gap-3">
                {
                    problem?.visibleTestCasesForUser?.map((val,index)=>{
                        return(
                            <div key={index} className="flex flex-col gap-2">
                                <p className="text-1xl text-white font-bold">Example {index+1}</p>
                                <div className="text-gray-500"><span className="text-1xl text-white">Input : </span>{val?.input}</div>
                                <div className="text-gray-500"><span className="text-1xl text-white">Output : </span>{val?.output}</div>
                                <div className="text-gray-500"><span className="text-1xl text-white">Explanation : </span>{val?.explanation}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p className="text-1xl text-white font-bold" >Company Tags</p>
                <div className="flex justify-around items-center gap-3">
                    {
                        problem?.tags?.map((val,index)=>{
                            return(
                                <span className="p-2 text-amber-600 bg-gray-700" key={index}>
                                    {val}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}