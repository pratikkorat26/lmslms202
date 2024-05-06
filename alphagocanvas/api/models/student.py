from typing import List

from pydantic import BaseModel


########################################################################################


########################################################################################
#  "/profile", "/update_profile"
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
    Coursesemester: str


class StudentAssignments(BaseModel):
    Courseid: int
    Coursename: str
    Assignmentid: int
    Assignmentname: str
    Assignmentdescription: str


class StudentQuizzes(BaseModel):
    Courseid: int
    Coursename: str
    Quizid: int
    Quizname: str
    Quizdescription: str


class StudentAnnouncements(BaseModel):
    Courseid: int
    Coursename: str
    Announcementid: int
    Announcementname: str
    Announcementdescription: str


class StudentInformationDetails(BaseModel):
    Studentid: int
    Studentname: str
    Studentcontactnumber: str
    Coursename: str
    Coursesemester: str
    Coursegrade: str


class CourseStudentGrade(BaseModel):
    Studentid: int
    EnrollmentGrades: str
    Studentname: str
    EnrollmentSemester: str
    Coursename: str


############################################ RESPONSE MODELS ############################################
# "/view_grades"
class StudentGradesResponse(BaseModel):
    data: List[StudentGrades]


# "/previous_enrollment"
class StudentPreviousEnrollmentResponse(BaseModel):
    data: List[StudentEnrollment]


# "/view_contents"
class StudentCourseDetailsResponse(BaseModel):
    data: List[StudentCourseDetails]


# "/view_assignment_published"
class StudentAssignmentsResponse(BaseModel):
    data: List[StudentAssignments]


# "/view_quizzes_published"
class StudentQuizzesResponse(BaseModel):
    data: List[StudentQuizzes]


# "/view_announcements_published"
class StudentAnnouncementsResponse(BaseModel):
    data: List[StudentAnnouncements]
