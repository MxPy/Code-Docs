from fastapi import status, Response, HTTPException, APIRouter, WebSocket, WebSocketDisconnect , Query
from auth import jwt_handler, jwt_bearer
from uuid import uuid4
from database import schemas
from websocket.ConnectionManager import ConnectionManager
from typing import List

router = APIRouter(
    prefix='/user',
    tags=['user'])


@router.post("/login", status_code=status.HTTP_200_OK)
async def user_login(user:schemas.UserLogin):
    if user.room_id != "":
        token =  jwt_handler.signJWT(user.username, user.room_id)
    else:
        user.room_id = str(uuid4())
        token =  jwt_handler.signJWT(user.username, user.room_id)
    return {
        "token": token,
        "room_id": user.room_id
        }  
    
@router.get("/myself", status_code=status.HTTP_200_OK)
async def user_login(token: str = Query(...)):
    return jwt_handler.decodeJWT(token=token)

#TODO: move this to other router
manager = ConnectionManager()
@router.websocket("/connect/{token}")
async def user_connect(websocket: WebSocket, token: str):
    room_id = jwt_handler.decodeJWT(token=token)["room_id"]
    username = jwt_handler.decodeJWT(token=token)["username"]
    await manager.connect(str(room_id), websocket)
    #await manager.broadcast(str(room_id), "connected")
    try: 
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(str(room_id), data)
    except WebSocketDisconnect:
        manager.disconnect(str(room_id), websocket)
        #await manager.broadcast(str(room_id), "disconected")
            