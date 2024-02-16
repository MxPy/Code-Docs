from fastapi import status, Response, HTTPException, APIRouter, WebSocket, WebSocketDisconnect
from auth import jwt_handler, jwt_bearer
from uuid import uuid4
from database import schemas
from websocket.ConnectionManager import ConnectionManager
from typing import List

router = APIRouter(
    prefix='/user',
    tags=['user'])

def check_user(data: schemas.UserLogin):
    if data.room_id != "":
        return jwt_handler.signJWT(data.username, data.room_id)
    else:
        return jwt_handler.signJWT(data.username, str(uuid4()))
    #return False

@router.post("/login", status_code=status.HTTP_200_OK)
async def user_login(user:schemas.UserLogin):
    token = check_user(user)
    # if not token:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
    #                         detail=f'Wrong username or password')
    return token

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
            