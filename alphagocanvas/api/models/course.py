from pydantic import BaseModel


class CourseFacultySemesterRequest(BaseModel):
    Courseid: int
    Facultyid: int
    Coursesemester: str


class CourseFacultySemesterResponse(BaseModel):
    Success: str
