import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import api from "../../Api";

const cookies = new Cookies();

const Editor = () => {
  const navi = useNavigate();


  useEffect(() => {
    const fetchAllUsers =async () => {
        try{
            //const response = await api.get('/myself', { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`} })
            //setUserData(response.data)
        }catch(error){
            console.error(error);
        };
            };
    if(cookies.get('jwt')){
      console.log(cookies.get('jwt'))
        //fetchAllUsers();
    }else(
      setTimeout(()=>{
          navi("/login", {replace: true})
      }, 100)
  )
}, [])
  return (
    <div>Editor</div>
  )
}

export default Editor