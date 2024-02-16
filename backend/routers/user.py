from fastapi import status, Response, HTTPException, APIRouter, WebSocket, WebSocketDisconnect
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

#TODO: move this to other router
manager = ConnectionManager()
@router.websocket("/connect/{room_id}")
async def user_connect(websocket: WebSocket, room_id: str):
    await manager.connect(str(room_id), websocket)
    await manager.broadcast("connected", room_id)
    try: 
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(room_id, data)
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
        await manager.broadcast("disconected", room_id)
            