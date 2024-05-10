from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

from alphagocanvas.api.models.token import TokenData, Token
from alphagocanvas.api.services.authentication_service import get_user
from alphagocanvas.api.utils import create_token
from alphagocanvas.database import database_dependency

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


@router.post("/token", response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: database_dependency):
    """

    :param form_data: Oauth2PasswordRequestForm data
    :param db: database_dependency object

    :return: encoded generated token
    """
    if not form_data:
        raise HTTPException(status_code=404, detail="No payload found")

    email = form_data.username
    password = form_data.password

    print(form_data.username, form_data.password)

    role = None
    authenticated = False

    user = get_user(email, db)
    print(user.Userrole, user.Userid, user.Useremail, user.Userpassword)
    # user = db.query(UserTable).filter(UserTable.Useremail == email).first()
    # user does not exists:
    #    """ return -> Invalid Credentials -> User does not exist or false username or password"""
    # return Error -> Invalid credentials -> User does not exist

    if not user:
        raise HTTPException(status_code=401, detail="User not found, or Invalid Credentials")

    # check the authenticity
    if email == user.Useremail and password == user.Userpassword:
        print(authenticated)
        authenticated = True

    # REPLACE THE CODE HERE ONCE USER DATA IS GENERATED

    if not authenticated:
        raise HTTPException(status_code=401, detail="Incorrect useremail or password")
    # check user role if it is admin:
    # fetch the information from the admin table and also attach the role in the token
    if authenticated:
        if user.Userrole == "Student":
            role = "Student"

        # check user role if it is student:
        # fetch the information from the student table and also attach the role in the token
        if user.Userrole == "Admin":
            role = "Admin"

        # check user role if it is faculty:
        # fetch the information from the faculty table and also attach the role in the token
        if user.Userrole == "Faculty":
            role = "Faculty"

        # Create token data
        # call create function from utils
        token = TokenData(useremail=email, userpassword=password, userrole=role, userid=user.Userid)

        encoded_token = create_token(token)

        # Encoded token
        token_encoded = Token(access_token=encoded_token, token_type="Bearer")

        return token_encoded
