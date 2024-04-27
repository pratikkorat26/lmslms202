from typing import Annotated, List

from alphagocanvas.api.models.student import StudentInformation, StudentGrades, StudentEnrollment, StudentCourseDetails, \
    StudentAssignments, StudentQuizzes, StudentAnnouncements
from alphagocanvas.api.services.student_service import get_student, update_student, get_grades, get_enrollments, \
    get_course_details, get_published_assignments, get_published_quizzes, get_published_announcement
from alphagocanvas.api.utils.auth import is_current_user_student, decode_token
from fastapi import APIRouter, Depends, HTTPException
from alphagocanvas.database import database_dependency
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter(prefix="/student", tags=["student"])


@router.get("/profile", dependencies=[Depends(is_current_user_student)])
async def get_profile(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    student = get_student(decoded_token.get("userid"), db=db)

    return student


@router.put("/update_profile",
            dependencies=[Depends(is_current_user_student)],
            response_model=StudentInformation)
async def update_profile(studentdata: StudentInformation,
                         db: database_dependency,
                         token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    studentid = decoded_token.get("userid")

    data = update_student(studentid, studentdata, db)

    return data


@router.get("/view_grades",
            dependencies=[Depends(is_current_user_student)],
            response_model=List[StudentGrades])
async def view_grades(db: database_dependency,
                      token: Annotated[str, Depends(oauth2_scheme)],
                      current_semester: str = "SPRING24"):
    # Decode token and retrieve the data
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    studentid = decoded_token.get("userid")

    # Get data from the database
    data = get_grades(studentid, db, current_semester)

    return data


@router.get("/previous_enrollment",
            dependencies=[Depends(is_current_user_student)],
            response_model=List[StudentEnrollment])
async def view_enrollment(db: database_dependency,
                          token: Annotated[str, Depends(oauth2_scheme)]):
    # Decode token and retrieve the data
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    studentid = decoded_token.get("userid")

    data = get_enrollments(studentid, db)

    return data


# This route is for view contents if published
@router.get("/view_contents",
            dependencies=[Depends(is_current_user_student)],
            response_model=List[StudentCourseDetails])
async def view_contents(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)]):

    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")
    # retrieve the data from the
    studentid = decoded_token.get("userid")

    data = get_course_details(db, studentid = studentid)

    return data


@router.get("/view_assignment_published", dependencies=[Depends(is_current_user_student)],
            response_model=List[StudentAssignments])
async def view_assignment_published(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)],
                                    current_semester="SPRING24"):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    studentid = decoded_token.get("userid")

    data = get_published_assignments(db, studentid=studentid, current_semester=current_semester)

    return data


@router.get("/view_quizzes_published", dependencies=[Depends(is_current_user_student)],
            response_model=List[StudentQuizzes])
async def view_quizzes_published(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)],
                                 current_semester="SPRING24"):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    studentid = decoded_token.get("userid")

    data = get_published_quizzes(db, studentid=studentid, current_semester=current_semester)

    return data


@router.get("/view_announcements_published", dependencies=[Depends(is_current_user_student)],
            response_model=List[StudentAnnouncements])
async def view_announcements_published(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)],
                                 current_semester="SPRING24"):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Student":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    studentid = decoded_token.get("userid")

    data = get_published_announcement(db, studentid=studentid, current_semester=current_semester)

    return data
