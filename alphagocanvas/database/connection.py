from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from alphagocanvas.config import URL_DATABASE

ENGINE = create_engine(URL_DATABASE, pool_size=5)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)


def get_database():
    """
    :return: return the database session which is used to access the data from the database
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# database dependency
database_dependency = Annotated[Session, Depends(get_database)]
