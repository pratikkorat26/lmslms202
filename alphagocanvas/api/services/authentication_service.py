from alphagocanvas.database import database_dependency
from alphagocanvas.database.models import UserTable


def get_user(email: str, db: database_dependency):
    """
    :param email: email from the authentication form
    :param db: database_dependency
    :return: retrieved data from the database
    """

    user = db.query(UserTable).filter(UserTable.Useremail == email).first()

    return user
