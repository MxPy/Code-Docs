import React, {useState, useEffect} from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
type socket = {
  ws: WebSocket
  username: string;
}

const CodeEditor = ({ws, username}: socket) => {
  const [editorValue, setEditorValue] = useState<string>('');
  
  function handleEditorChange(value: string | undefined, event: any) {
    //console.log('here is the current model value:', value);
        var message = { "username": username,
                        //type 0 - chat message, type 1 - code
                        "type": 1,
                        "message": value};
        console.log("chuj");
                        
        ws.send(JSON.stringify(message));
  }

  ws.onmessage = function(event) {
    //console.log("chuj2");
    if(JSON.parse(event.data).type == 1){
      setEditorValue(JSON.parse(event.data).message)
      
    }
  }
  

  return (
    <div>
        <Editor 
        height="90vh" 
        defaultLanguage="python" 
        defaultValue="// some comment" 
        theme="vs-dark" 
        onChange={handleEditorChange}
        value={editorValue}
        />
        
    </div>
  )
}

export default CodeEditor