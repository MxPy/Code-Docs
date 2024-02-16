import React, {useState, useEffect} from "react";
import api from "../../Api";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
type UserData = {
    username: string;
    room_id: string; 
}

const cookies = new Cookies();

const Login = () => {
    const navi = useNavigate();
    //redirect user to / if he's logged in 
    //TODO: Temporary solution, change this in future
    useEffect(() => {
        if(!cookies.get('jwt')){
            console.log(cookies.get('jwt'))
        }
        else(
            setTimeout(()=>{
                navi("/", {replace: true, state: formData})
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
            const response = await api.post('/user/login', formData);
            cookies.set("jwt", response.data["token"]["access_token"], {path: '/', expires: new Date(Date.now()+response.data["token"]["exp"]*1000)});
            formData.room_id = response.data["room_id"]
            setTimeout(()=>{
                navi("/", {replace: true, state: formData})
            }, 100)
        }catch(error){
            alert("Something gone wrong")
        }
    }
  return (
    <div className="flex justify-center h-screen flex-col items-center ">
        <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"> </a>
        <div className="flex justify-center bg-slate-700 text-gray-200 border-slate-500  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-">
            <div className="p-4 space-y-4 md:space-y-3 sm:p-4">
                <form onSubmit = {handleSubmit} className="space-y-4 md:space-y-3" action="#">
                <div>
                        <input onChange = {handleChange} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username"></input>
                    </div>
                    <button className="flex text-gray-300 transition duration-300 ease-in-out justify-center rounded-lg flex-1 shadow-lg p-2 py-2 font-semibold mx-auto bg-blue-800 hover:bg-blue-900 border border-slate-600">Start Coding Now</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login