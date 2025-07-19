import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

export default function CodeEditor({editorRef,lang,problem}){

    const solutions = problem?.solution || [];
    const [boilerPlate,setboilerPlate] = useState("code here");

    console.log(solutions);
    useEffect(()=>{
        for(const sol of solutions){
            if(sol?.language === lang){
                setboilerPlate(sol?.codeSolution);
            }
        }
    },[lang]);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    return(
    <Editor 
        height="100%" 
        width="100%" 
        defaultLanguage={lang === "c++" ? "cpp" : lang} 
        defaultValue= {boilerPlate}
        onMount={handleEditorDidMount}
    />);
}