import Editor from '@monaco-editor/react';

export default function CodeEditor({editorRef}){
    return(
    <Editor 
        height="80%" 
        width="100%" 
        defaultLanguage="javascript" 
        defaultValue="// some comment"
    />);
}