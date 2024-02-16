import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../Api";
type UserData = {
  username: string;
  room_id: string; 
}
const cookies = new Cookies();

const Editor = () => {
  
  const navi = useNavigate();
  const [formData, setFormData] = useState<UserData> ({
    username: '',
    room_id: '',
})

  


  useEffect(() => {
      //redirect user to / if he isn't logged in 
      //TODO: Temporary solution, change this in future
      if(cookies.get('jwt')){
        const getData = async () => {
          try{
            const response = await api.get('/user/myself?token='+cookies.get('jwt'))
            //temp
            formData.username = response.data["username"]
            formData.room_id = response.data["room_id"]
          }catch(error){
              alert("Something gone wrong")
          }
        
      }
      getData()
      console.log(formData.room_id);
      
      const ws = new WebSocket('ws://localhost:8000/user/connect/'+formData.room_id);
      ws.onmessage = function(event) {
        var messages = document.getElementById('messages');
        var message = document.createElement('li');
        var content = document.createTextNode(JSON.parse(event.data).message);
        message.appendChild(content);
        if(messages)
        messages.appendChild(message);
      };
      return () => {
        if (ws.readyState === 1) { // <-- This is important
            ws.close();
        }
      }
    }else(
      setTimeout(()=>{
          navi("/login", {replace: true})
      }, 100)
    )
     
}, [])
  return (
    <div>
      <div>Witaj</div>
      <ul id='messages'></ul>
    </div>
    
    
  )
}

export default Editor