import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import Chat from "./Chat";
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../Api";
type UserData = {
  username: string;
  room_id: string; 
}
const cookies = new Cookies();

const Editor = () => {
  
  const navi = useNavigate();
  const [loading, setLoading] = useState(false); 
  
  const [formData, setFormData] = useState<UserData> ({
    username: '',
    room_id: '',
})
  

const [ws, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
      //redirect user to / if he isn't logged in 
      //TODO: Temporary solution, change this in future
      if(cookies.get('jwt')){
        const getData = async () => {
          try{
            setLoading(true); 
            const response = await api.get('/user/myself?token='+cookies.get('jwt'))
            //temp
            setFormData(response.data)
            console.log(formData.username);
            
            
          }catch(error){
              alert("Something gone wrong")
          }
        
      }
      getData()
      //console.log(formData.room_id);
      const ws = new WebSocket('ws://localhost:8000/user/connect/'+cookies.get('jwt'));
      setSocket(ws);
      console.log(ws.url);
      
      setLoading(false); 
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
    <div className="flex h-screen flex-col text-white"  >
      {loading ? ( 
                    <h4>Loading...</h4> 
                ) : ( 
                  <div>
                  <div>Witaj {formData.username}</div>
                  <div>Jestes w pokoju {formData.room_id}</div>
                  <div>Link do zaproszenia do pokoju http://localhost:3000/login/{formData.room_id}</div>
                  <ul id='messages'></ul>
                  {ws ? (
                    <Chat ws={ws}></Chat>
                  ):(<div>chuj</div>)}
                  
                  </div>
                )} 
    </div>
    
    
  )
}

export default Editor