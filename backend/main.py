from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routers import user
from decouple import config

app = FastAPI()

FRONTEND = config("frontend")

origins = ["http://localhost:3000",
           FRONTEND
            ]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router)

