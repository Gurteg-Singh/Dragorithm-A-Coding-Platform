import { useOutletContext } from "react-router";
import Editor from '@monaco-editor/react';
import { useEffect,useRef } from "react";

export default function ProblemSolution(){
    const {problem,lang} = useOutletContext();
    const solutions = problem?.solution;

    const answerRef = useRef(null);

    let answer ="";
    for(const sol of solutions){
        if(sol?.language === lang){
            answer = sol?.codeSolution;
            break;
        }
    }

    function handleEditorDidMount(editor, monacoInstance) {
        answerRef.current = editor;
    }

    useEffect(()=>{
        if(answerRef.current){
            answerRef.current.setValue(answer);
        }
    },[lang]);


    return(
        <div className="h-full w-full flex justify-center items-center">
            <Editor 
                height="100%" 
                width="100%" 
                defaultLanguage={lang === "c++" ? "cpp" : lang} 
                defaultValue= {answer}
                theme='vs-dark'
                onMount={handleEditorDidMount}
            />
        </div>
    )
}