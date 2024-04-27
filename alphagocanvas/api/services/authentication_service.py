from fastapi.security import OAuth2PasswordRequestForm

from alphagocanvas.database.models import UserTable
from alphagocanvas.database import database_dependency


def get_user(email : str, db: database_dependency):
    """
    :param email: email from the authentication form
    :param db: database_dependency
    :return: retrieved data from the database
    """

    user = db.query(UserTable).filter(UserTable.Useremail == email).first()

    return user
