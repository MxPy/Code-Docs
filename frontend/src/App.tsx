import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
  return (
    <div className="bg-slate-500">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} /* login only temp, TODO: replace with Editor*//>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
