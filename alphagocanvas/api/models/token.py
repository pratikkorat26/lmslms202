from datetime import datetime

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    useremail: str
    userpassword: str
    userrole: str
    userid : int
