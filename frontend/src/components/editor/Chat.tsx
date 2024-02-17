import React from 'react'

type socket = {
    ws: WebSocket
}

const Chat = ({ws}: socket) => {
    console.log(ws.url);
    
  return (
    <div>chat</div>
  )
}

export default Chat