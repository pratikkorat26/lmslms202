from pydantic import BaseModel


class StudentInformation(BaseModel):
    Studentfirstname: str
    Studentlastname: str
    Studentcontactnumber: str
    Studentnotification: bool


class StudentGrades(BaseModel):
    Studentid: int
    Courseid: int
    Coursename: str
    EnrollmentGrades: str
    EnrollmentSemester: str


class StudentEnrollment(BaseModel):
    Studentid: int
    Courseid: int
    Coursename: str
    EnrollmentSemester: str


class StudentCourseDetails(BaseModel):
    Courseid: int
    Coursename: str
    Coursedescription: str
    Coursesemester : str

class StudentAssignments(BaseModel):
    Courseid : int
    Coursename : str
    Assignmentid : int
    Assignmentname: str
    Assignmentdescription : str

class StudentQuizzes(BaseModel):
    Courseid: int
    Coursename : str
    Quizid : int
    Quizname : str
    Quizdescription : str

class StudentAnnouncements(BaseModel):
    Courseid: int
    Coursename: str
    Announcementid: int
    Announcementname: str
    Announcementdescription: str

class StudentInformationCourses(BaseModel):
    Studentid : int
    Studentfirstname : str
    Studentlastname : str
    Studentcontactnumber : str
    Courseid : int
    Coursename : str
    Coursesemester : str

class StudentInformationDetails(BaseModel):
    Studentid : int
    Studentname : str
    Studentcontactnumber : str
    Coursename : str
    Coursesemester : str

class CourseStudentGrade(BaseModel):
    Studentid: int
    EnrollmentGrades: str
    Studentname : str
    EnrollmentSemester: str
    Coursename: str

class CoursesForAdmin(BaseModel):
    Courseid : int
    Coursename : str

class FacultyForAdmin(BaseModel):
    Facultyid : int
    Facultyname : str

