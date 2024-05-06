from typing import List

from pydantic import BaseModel


class AdminCoursesByFaculty(BaseModel):
    Adminid: int
    Courseid: int
    Facultyid: int
    Coursename: str
    Coursedescription: str
    Facultyfirstname: str
    Facultylastname: str
    Coursesemester: str
    Coursepublished: int


class StudentInformationCourses(BaseModel):
    Studentid: int
    Studentfirstname: str
    Studentlastname: str
    Studentcontactnumber: str
    Courseid: int
    Coursename: str
    Coursesemester: str


class CoursesForAdmin(BaseModel):
    Courseid: int
    Coursename: str


class FacultyForAdmin(BaseModel):
    Facultyid: int
    Facultyname: str


############################################## RESPONSE MODEL ##############################################

# "/view_courses_by_faculty"
class AdminCoursesByFacultyResponse(BaseModel):
    data: List[AdminCoursesByFaculty]


# "/view_student_information"
class AdminStudentInformationCoursesResponse(BaseModel):
    data: List[StudentInformationCourses]


# "/view_courses"
class AdminCoursesForAdminResponse(BaseModel):
    data: List[CoursesForAdmin]


# "/view_faculties"
class AdminFacultyForAdminResponse(BaseModel):
    data: List[FacultyForAdmin]
