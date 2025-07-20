import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

export default function CodeEditor({editorRef,lang,problem}){

    const solutions = problem?.code || [];
    let boilerPlate = "code here";
    const monacoRef = useRef(null);

    for(const sol of solutions){
        if(sol?.language.toLowerCase() === lang){
            boilerPlate = sol?.boilerPlateCode;
            break;
        }
    }

    function handleEditorDidMount(editor, monacoInstance) {
        editorRef.current = editor;

        // Save monaco instance if you need it later
        monacoRef.current = monacoInstance;
    }

    useEffect(() => {
        if (editorRef.current && monacoRef.current) {
            const model = editorRef.current.getModel();
            const monacoLang = lang === "c++" ? "cpp" : lang.toLowerCase();

            if (model) {
                monacoRef.current.editor.setModelLanguage(model, monacoLang);
                editorRef.current.setValue(boilerPlate);
            }
        }
    }, [lang, problem]);

    return(
    <Editor 
        height="100%" 
        width="100%" 
        defaultLanguage={lang === "c++" ? "cpp" : lang} 
        defaultValue= {boilerPlate}
        theme='vs-dark'
        onMount={handleEditorDidMount}
    />);
}