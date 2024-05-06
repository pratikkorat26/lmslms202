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
