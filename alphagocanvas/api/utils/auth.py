from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from starlette import status

from alphagocanvas.api.models import TokenData
from alphagocanvas.config import SECRET_KEY, ALGORITHM
from alphagocanvas.database import database_dependency, UserTable

# Bearer token authentication system
_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def get_current_user(token: Annotated[str, Depends(_oauth2_scheme)], db: database_dependency):
    """
    Retrieve the current user from the bearer token which was issued at the login time

    :param token: bearer_token which was issued to user when it has logged in first time
    :param db: database dependency which allows us to get the data of user from the database

    :return: UserTable instance containing the information about user
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, [ALGORITHM])
        useremail = payload.get("useremail")
        userrole = payload.get("userrole")
        userid = payload.get("userid")

        if useremail is None or userrole is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate credentials")
        user = db.query(UserTable).filter(UserTable.Useremail == useremail and UserTable.UserID == userid).first()
        return user

    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate credentials")


async def is_current_user_admin(current_user: UserTable = Depends(get_current_user)):
    """

    :param current_user: current logged-in user if get_current_user able to parse the user information

    :return: True if user is admin else False, which is used for limiting the access for APIs

    """
    return current_user.Userrole == "Admin"


async def is_current_user_student(current_user: UserTable = Depends(get_current_user)):
    """
    :param current_user: current logged-in user if get_current_user able to parse the user information

    :return: True if user is student else False, which is used for limiting the access for APIs.

    """
    return current_user.Userrole == "Student"


async def is_current_user_faculty(current_user: UserTable = Depends(get_current_user)):
    """
    :param current_user: current logged-in user if get_current_user able to parse the user information

    :return: True if user is faculty else False, which is used for limiting the access for APIs.

    """
    return current_user.Userrole == "Faculty"


def create_token(token: TokenData):
    """

    :param token: TokenData object with token data
    :return: encoded token
    """
    useremail = token.useremail
    userrole = token.userrole
    userid = token.userid

    to_encode = {"useremail": useremail, "userrole": userrole, "userid": userid}

    encoded_token = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)

    return encoded_token


def decode_token(token: str):
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    return decoded_token
