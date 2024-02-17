import React from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <div>
        <Editor height="90vh" defaultLanguage="python" defaultValue="// some comment" theme="vs-dark" />
    </div>
  )
}

export default CodeEditor