import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Editor from './components/editor/Editor';

function App() {
  return (
    <div className="bg-slate-500">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Editor/>} />
          <Route path="/login/:room_id?" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
