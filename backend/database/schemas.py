from pydantic import BaseModel
from typing import List, Optional
from datetime import time, date


class UserLogin(BaseModel):
    username: str 
    room_id: str 
    