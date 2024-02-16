import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../Api";

const cookies = new Cookies();
var ws = null;

const Editor = () => {
  
  const navi = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //redirect user to / if he isn't logged in 
    //TODO: Temporary solution, change this in future
    if(cookies.get('jwt')){
    
      ws = new WebSocket('ws://localhost:8000/user/connect/'+location.state.room_id);
    }else(
      setTimeout(()=>{
          navi("/login", {replace: true})
      }, 100)
  )
}, [])
  return (
    <div>Witaj {location.state.username}</div>
  )
}

export default Editor