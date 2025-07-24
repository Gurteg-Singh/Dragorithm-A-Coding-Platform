import Editor from '@monaco-editor/react';
import { useEffect, useRef} from 'react';


export default function CodeEditor({editorRef,lang,problem,codeRef,hasMounted}){

    const solutions = problem?.code || [];
    const monacoRef = useRef(null);

    function fillEditor(){
        if(!hasMounted.current){
            let boilerPlate = "";
            for(const sol of solutions){
                if(sol?.language.toLowerCase() === lang){
                    boilerPlate = sol?.boilerPlateCode;
                    break;
                }
            }
            editorRef.current?.setValue(boilerPlate);
            hasMounted.current = true;
        }else{
            editorRef.current?.setValue(codeRef.current);
        }
    }

    function handleEditorDidMount(editor, monacoInstance) {

        editorRef.current = editor;
        // Save monaco instance if you need it later
        monacoRef.current = monacoInstance;
        fillEditor();
    }

    useEffect(() => {
        if (editorRef.current && monacoRef.current) {
            const model = editorRef.current.getModel();
            const monacoLang = lang === "c++" ? "cpp" : lang.toLowerCase();

            if (model) {
                monacoRef.current.editor.setModelLanguage(model, monacoLang);
                let boilerPlate = "";
                for(const sol of solutions){
                    if(sol?.language.toLowerCase() === lang){
                        boilerPlate = sol?.boilerPlateCode;
                        break;
                    }
                }
                editorRef.current.setValue(boilerPlate);
            }
        }
    }, [lang]);

    return(
    <Editor 
        height="100%" 
        width="100%" 
        defaultLanguage={lang === "c++" ? "cpp" : lang} 
        value="code here"
        theme='vs-dark'
        onChange={(val)=>codeRef.current=val}
        onMount={handleEditorDidMount}
    />);
}