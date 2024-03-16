import React, {useState, useEffect} from "react";
import api from "../../Api";
import { useParams } from 'react-router';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button"
type UserData = {
    username: string;
    room_id: string; 
}

const cookies = new Cookies();

const Login = () => {
    const {room_id}  = useParams(); 
    const navi = useNavigate();
    //redirect user to / if he's logged in 
    //TODO: Temporary solution, change this in future
    useEffect(() => {
        if(!cookies.get('jwt')){
            console.log(cookies.get('jwt'))
        }
        else(
            setTimeout(()=>{
                navi("/", {replace: true})
            }, 100)
        )
    }, [])
    
    const [formData, setFormData] = useState<UserData> ({
        username: '',
        room_id: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prevData =>({...prevData, [name]: value}))
    }

    const handleSubmit =async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(room_id)formData.room_id = room_id.toString();
            const response = await api.post('/user/login', formData);
            cookies.set("jwt", response.data["token"]["access_token"], {path: '/', expires: new Date(Date.now()+response.data["token"]["exp"]*1000)});
            formData.room_id = response.data["room_id"]
            //TODO: fix refrashing page before getting token from server
            setTimeout(()=>{
                navi("/", {replace: true})
            }, 100)
        }catch(error){
            alert("Something gone wrong")
        }
    }
  return (
    <div className="flex justify-center h-screen flex-col items-center ">
        <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"> </a>
        <div className="flex justify-center">
            <div className="p-4 space-y-4 md:space-y-3 sm:p-4">
                <form onSubmit = {handleSubmit} className="space-y-4 md:space-y-3" action="#">
                <div >
                        <input onChange = {handleChange} type="username" name="username" id="username" className="text-white border bg-transparent border-teal-400 focus:ring-teal-400 focus:ring-4 focus:outline-none  font-semibold rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 " placeholder="Username"></input>
                </div>
                <button className="flex justify-center mx-auto text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center ">Start Coding Now</button>
                <Button variant="outline">Start Coding Now</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login