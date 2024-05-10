from typing import List

from pydantic import BaseModel

from alphagocanvas.api.models.student import StudentInformationDetails, CourseStudentGrade


class CoursesByFaculty(BaseModel):
    Courseid: int
    Coursename: str
    Coursesemester: str
    Facultyfirstname: str
    Facultyid: int
    Facultylastname: str
    Coursepublished: bool


class AddSyllabusRequest(BaseModel):
    Courseid: int
    Coursesemester: str
    Coursedescription: str


class AddSyllabusResponse(BaseModel):
    Success: str


class StudentGradeFaculty(BaseModel):
    Studentid: int
    Courseid: int
    Semester: str
    Grade: str


class StudentGradeFacultyResponse(BaseModel):
    Success: str


class QuizRequestFacultyRequest(BaseModel):
    Courseid: int
    Quizname: str
    Quizdescription: str
    Semester: str


class QuizRequestFacultyResponse(BaseModel):
    Success: str


class AssignmentRequestFacultyRequest(BaseModel):
    Courseid: int
    Assignmentname: str
    Assignmentdescription: str
    Semester: str


class AssignmentRequestFacultyResponse(BaseModel):
    Success: str


class AnnouncementRequestFacultyRequest(BaseModel):
    Courseid: int
    Announcementname: str
    Announcementdescription: str
    Semester: str


class AnnouncementRequestFacultyResponse(BaseModel):
    Success: str


class AssignmentResponse(BaseModel):
    Assignmentid: int
    Assignmentname: str
    Assignmentdescription: str
    Courseid: int


class QuizResponse(BaseModel):
    Quizid: int
    Quizname: str
    Quizdescription: str
    Courseid: int


class AnnouncementResponse(BaseModel):
    Announcementid: int
    Announcementname: str
    Announcementdescription: str
    Courseid: int


class FacultyCourseDetails(BaseModel):
    Coursecourseid: int
    Coursesemester: str
    Coursedescription: str


######################################### RESPONSE MODELS ########################################


# "/courses_taught"
class FacultyCourseTaughtResponse(BaseModel):
    data: List[CoursesByFaculty]


# ""/view_students"
class FacultyListOfStudentsResponse(BaseModel):
    data: List[StudentInformationDetails]


# "/view_grades_each_student"
class FacultyCourseStudentGradeResponse(BaseModel):
    data: List[CourseStudentGrade]


# "/view_assignment_by_courseid"
class FacultyAssignmentResponse(BaseModel):
    data: List[AssignmentResponse]


# "/view_quiz_by_courseid"
class FacultyQuizResponse(BaseModel):
    data: List[QuizResponse]


# "/view_announcement_by_courseid"
class FacultyAnnouncementResponse(BaseModel):
    data: List[AnnouncementResponse]


# "/view_content_by_courseid"
class FacultyCourseDetailsResponse(BaseModel):
    data: List[FacultyCourseDetails]
