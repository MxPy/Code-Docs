#https://github.com/BekBrace/FASTAPI-and-JWT-Authentication/
import time
from typing import Dict

import jwt
from decouple import config


JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")
EXP_TIME = 600


def token_response(token: str):
    return {
        "access_token": token,
        "exp": EXP_TIME
    }

# function used for signing the JWT string
def signJWT(user_id: int) -> Dict[str, str]:
    payload = {
        "userID": user_id,
        "exp": time.time() + EXP_TIME
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except:
        return {}