from typing import Annotated, List

from alphagocanvas.api.models.course import CourseFacultySemesterRequest, CourseFacultySemesterResponse
from alphagocanvas.api.models.faculty import AdminCoursesByFaculty
from alphagocanvas.api.models.student import StudentInformation, StudentInformationCourses, CoursesForAdmin, \
    FacultyForAdmin
from alphagocanvas.api.services.admin_service import get_courses_by_faculty, assign_course_to_faculty, get_students, \
    get_courses, get_faculties
from alphagocanvas.api.utils.auth import is_current_user_admin, decode_token
from fastapi import APIRouter, Depends, HTTPException
from alphagocanvas.database import database_dependency
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/view_courses_by_faculty",
            dependencies=[Depends(is_current_user_admin)], response_model=List[AdminCoursesByFaculty])
async def get_profile(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Admin":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    adminid = decoded_token.get("userid")

    courses_by_faculty = get_courses_by_faculty(db, adminid)

    return courses_by_faculty


@router.post("/assign_course",
             dependencies=[Depends(is_current_user_admin)],
             response_model=CourseFacultySemesterResponse)
async def assign_course(params: CourseFacultySemesterRequest,
                        db: database_dependency,
                        token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Admin":
        raise HTTPException(status_code=403, detail="Unauthorised method for user")

    response = assign_course_to_faculty(db, params)

    return response


@router.get("/view_student_information",
            dependencies=[Depends(is_current_user_admin)],
            response_model=List[StudentInformationCourses])
async def view_student_information(db: database_dependency,
                                   token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Admin":
        raise HTTPException(status_code=403, detail="Unauthorised method for user")

    students = get_students(db)

    return students


@router.get("/view_courses",
            dependencies=[Depends(is_current_user_admin)],
            response_model=List[CoursesForAdmin])
async def get_courses_for_admin(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Admin":
        raise HTTPException(status_code=403, detail="Unauthorised method for user")

    courses = get_courses(db)

    return courses


@router.get("/view_faculties",
            dependencies=[Depends(is_current_user_admin)],
            response_model=List[FacultyForAdmin])
async def get_courses_for_admin(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Admin":
        raise HTTPException(status_code=403, detail="Unauthorised method for user")

    faculties = get_faculties(db)

    return faculties