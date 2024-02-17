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
        messageContentP.className = "text-sm text-gray-500 truncate dark:text-gray-400"
        var content = document.createTextNode(JSON.parse(event.data).message);
        messageContentP.appendChild(content);
        messageDiv.appendChild(messageUsernameP)
        messageDiv.appendChild(messageContentP)
        message.appendChild(messageDiv)
        if(messagesList) messagesList.appendChild(message);
    };
    
  return (
    <div>
        <div className="w-1/5 h-1/5 mx-auto flex p-4 border bg-transparent border-teal-400 rounded-lg shadow-xl">
            <div className="pt-1 ">
            <ul className="max-w-lg min-w-md divide-y divide-teal-800  " id='msg'></ul>
            </div>
        </div>
    </div>
    
  )
}

export default Chat