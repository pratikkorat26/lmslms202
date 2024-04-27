from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from alphagocanvas.api.models.faculty import CoursesByFaculty, AddSyllabusRequest, StudentGradeFaculty, \
    StudentGradeFacultyResponse, QuizRequestFacultyResponse, QuizRequestFacultyRequest, \
    AssignmentRequestFacultyResponse, AssignmentRequestFacultyRequest, AnnouncementRequestFacultyResponse, \
    AnnouncementRequestFacultyRequest
from alphagocanvas.api.models.student import StudentInformationDetails
from alphagocanvas.api.services.faculty_service import get_courses_by_faculty, add_syllabus_to_course, \
    view_students_for_each_course, view_students_for_each_course_service, update_grade_students, add_quiz_to_course, \
    add_assignment_to_course, add_announcement_to_course
from alphagocanvas.api.utils.auth import decode_token, is_current_user_faculty
from alphagocanvas.database import database_dependency

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter(prefix="/faculty", tags=["faculty"])


@router.get("/courses_taught",
            dependencies=[Depends(is_current_user_faculty)], response_model=List[CoursesByFaculty])
async def get_profile(db: database_dependency, token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    # Retrieve faculty id from the decoded token
    facultyid = decoded_token.get("userid")

    # get the courses faculty data from the database and return the object
    courses_faculty = get_courses_by_faculty(db, facultyid)

    return courses_faculty


@router.post("/add-syllabus/", dependencies=[Depends(is_current_user_faculty)])
async def add_syllabus_content(params: AddSyllabusRequest, db: database_dependency,
                               token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=401, detail="Unauthorised method")

    facultyid = decoded_token.get("userid")
    success = add_syllabus_to_course(db, facultyid, params)

    return success


@router.get("/view_students", dependencies=[Depends(is_current_user_faculty)],
            response_model=List[StudentInformationDetails])
async def view_students(courseid: int,
                        db: database_dependency,
                        token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=401, detail="Unauthorized method")

    facultyid = decoded_token.get("userid")

    # Function responsible for retrieving the data
    students = view_students_for_each_course(db, courseid)

    return students


@router.get("/view_grades_each_student", dependencies=[Depends(is_current_user_faculty)])
async def view_grades_each_student(courseid: int,
                                   db: database_dependency,
                                   token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=403, detail="Unauthorized method")

    facultyid = decoded_token.get("userid")

    students = view_students_for_each_course_service(db, courseid)

    return students


@router.post("/assign_grades", dependencies=[Depends(is_current_user_faculty)],
             response_model=StudentGradeFacultyResponse)
async def assign_grades(params: StudentGradeFaculty,
                        db: database_dependency,
                        token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)
    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=403, detail="Unauthorized method")

    # Faculty can only update the grades of the students who are enrolled under his courses
    facultyid = decoded_token.get("userid")
    success = update_grade_students(facultyid, params, db)

    return success


@router.post("/add_quiz", dependencies=[Depends(is_current_user_faculty)], response_model=QuizRequestFacultyResponse)
async def add_quiz(params: QuizRequestFacultyRequest,
                   db: database_dependency,
                   token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=400, detail="Unauthorized method")

    facultyid = decoded_token.get("userid")
    success = add_quiz_to_course(params, facultyid, db)

    return success


@router.post("/add_assignment",
             dependencies=[Depends(is_current_user_faculty)],
             response_model=AssignmentRequestFacultyResponse)
async def add_assignment(params: AssignmentRequestFacultyRequest,
                         db: database_dependency,
                         token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=400, detail="Unauthorized method")

    facultyid = decoded_token.get("userid")
    success = add_assignment_to_course(params, facultyid, db)

    return success


@router.post("/add_announcements",
             dependencies=[Depends(is_current_user_faculty)],
             response_model=AnnouncementRequestFacultyResponse)
async def add_assignment(params: AnnouncementRequestFacultyRequest,
                         db: database_dependency,
                         token: Annotated[str, Depends(oauth2_scheme)]):
    decoded_token = decode_token(token=token)

    if decoded_token["userrole"] != "Faculty":
        raise HTTPException(status_code=400, detail="Unauthorized method")

    facultyid = decoded_token.get("userid")

    success = add_announcement_to_course(params, facultyid, db)

    return success
