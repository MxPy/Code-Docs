import React from 'react'

type socket = {
    ws: WebSocket
}

const Chat = ({ws}: socket) => {
    //console.log(ws.url);
    ws.onmessage = function(event) {
        var messagesList = document.getElementById('msg');
        var message = document.createElement('li');
        message.className = "pb-3 sm:pb-4"
        var messageDiv = document.createElement('div');
        messageDiv.className = "flex-1 min-w-0"
        var messageUsernameP = document.createElement('p');
        messageUsernameP.className = "text-sm font-semibold text-gray-900 truncate dark:text-white"
        //temp
        var username = document.createTextNode("username")
        messageUsernameP.appendChild(username)

        var messageContentP = document.createElement('p');
        messageContentP.className = "text-sm text-gray-500 truncate dark:text-gray-400 overflow-hidden"
        var content = document.createTextNode(JSON.parse(event.data).message);
        messageContentP.appendChild(content);
        messageDiv.appendChild(messageUsernameP)
        messageDiv.appendChild(messageContentP)
        message.appendChild(messageDiv)
        if(messagesList) messagesList.appendChild(message);
    };

    const sendMessage =async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        var input = document.getElementById("messageText") as HTMLInputElement;
        var message = { "message": input.value };
        ws.send(JSON.stringify(message));
        input.value = '';
    }
    
    
  return (
    <div>
        <div className="align-bottom max-h-50 min-h-72 max-h-72 max-w-50 mx-auto grid p-4 overflow-scroll border bg-transparent auto-rows-max border-teal-400 rounded-xl shadow-xl">
            <div className="pt-1 ">
            <ul className="min-w-fit divide-y divide-teal-800 min-h-max max-w-fit overflow-x-auto " id='msg'></ul>
            </div>
        </div>
        <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"> </a>
        <div className="flex justify-center">
            <div className="py-2 space-y-2 ">
                <form onSubmit = {sendMessage} className="" action="#">
                <div >
                        <input  type="username" name="username" id="messageText" className="text-white border bg-transparent border-teal-400 focus:ring-teal-400 focus:ring-4 focus:outline-none  font-semibold rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 w-3/4" placeholder="message"></input>
                        <button className="mx-auto text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-semibold rounded-lg text-sm px-4 py-3 text-center ">Send</button>
                </div>
                
                </form>
            </div>
        </div>
    </div>
        
  )
}

export default Chat