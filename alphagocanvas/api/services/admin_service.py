from typing import List

from fastapi import HTTPException
from sqlalchemy.orm import Session

from alphagocanvas.api.models.course import CourseFacultySemesterRequest, CourseFacultySemesterResponse
from alphagocanvas.api.models.faculty import AdminCoursesByFaculty
from alphagocanvas.api.models.student import StudentInformationCourses, CoursesForAdmin, FacultyForAdmin
from alphagocanvas.database import database_dependency
from sqlalchemy import text

from alphagocanvas.database.models import CourseFacultyTable, CourseTable, FacultyTable


def get_courses_by_faculty(db: database_dependency, adminid: int) -> List[AdminCoursesByFaculty]:
    """

    :param adminid:
    :param db: database dependency object, which will retrieve the object

    :return: List[AdminCoursesByFaculty] (List of Json objects)
    """

    raw_query = text(
        """
        SELECT
            cs.Coursecourseid,
            cs.Coursefacultyid,
            c.Coursename,
            cs.Coursedescription,
            f.Facultyfirstname,
            f.Facultylastname,
            cs.Coursesemester,
            cs.Coursepublished
        FROM
            coursefaculty cs
        JOIN
            faculty f ON cs.Coursefacultyid = f.Facultyid
        JOIN
            courses c ON cs.Coursecourseid = c.Courseid;
        """)

    courses = db.execute(raw_query).fetchall()
    courses_list = []

    # check if courses are not null, if yes, then raise error
    if len(courses) == 0:
        raise HTTPException(status_code=404, detail="Data not found")
    for course in courses:
        courses_list.append(AdminCoursesByFaculty(Courseid=course.Coursecourseid,
                                                  Facultyid=course.Coursefacultyid,
                                                  Coursename=course.Coursename,
                                                  Coursedescription="" if course.Coursedescription is None else course.Coursedescription,
                                                  Facultyfirstname=course.Facultyfirstname,
                                                  Facultylastname=course.Facultylastname,
                                                  Adminid=adminid,
                                                  Coursesemester=course.Coursesemester,
                                                  Coursepublished=course.Coursepublished if course.Coursepublished is not None else 0))

    return courses_list


def assign_course_to_faculty(db: database_dependency, params: CourseFacultySemesterRequest):
    """

    :param db: database dependency object
    :param params: CourseFacultySemester object with relevant data
    :return:
    """

    if not params:
        raise HTTPException(status_code=404, detail="Data not found")

    course_faculty = CourseFacultyTable(
        Coursefacultyid=params.Facultyid,
        Coursecourseid=params.Courseid,
        Coursesemester=params.Coursesemester,
        Coursepublished=0,
        Coursedscription="This is default course syllabus"
    )

    existing_record = db.query(CourseFacultyTable).filter(
        CourseFacultyTable.Coursefacultyid == params.Facultyid,
        CourseFacultyTable.Coursecourseid == params.Courseid,
        CourseFacultyTable.Coursesemester == params.Coursesemester
    ).first()

    if existing_record:
        raise HTTPException(status_code=409, detail="Record already exists in the database")
    else:
        db.add(course_faculty)
        db.commit()

    return CourseFacultySemesterResponse(Success="Successfully assigned courses to faculty")


def get_students(db: database_dependency) -> List[StudentInformationCourses]:
    """

    :param db: database dependency objects
    :return:
    """

    raw_query = text("""
        SELECT
            se.Studentid,
            s.Studentfirstname,
            s.Studentlastname,
            s.Studentcontactnumber,
            c.Courseid,
            c.Coursename
        FROM
            studentenrollment se
        JOIN
            courses c ON c.Courseid = se.Courseid
        JOIN
            student s ON s.Studentid = se.Studentid;
        """)

    students = db.execute(raw_query).fetchall()

    if len(students) == 0:
        raise HTTPException(status_code=404, detail="Data not found for the students")

    student_list = []

    """
    class StudentInformationCourses(BaseModel):
    Studentid : int
    Studentfirstname : str
    Studentlastname : str
    Studentcontactnumber : str
    Courseid : int
    Coursename : str"""

    for student in students:
        student_list.append(StudentInformationCourses(Studentid=student.Studentid,
                                                      Studentfirstname=student.Studentfirstname,
                                                      Studentlastname=student.Studentlastname,
                                                      Studentcontactnumber=student.Studentcontactnumber,
                                                      Courseid=student.Courseid,
                                                      Coursename=student.Coursename))

    return student_list


def get_courses(db: database_dependency):
    """
    db : database dependency

    returns : list of all courses
    """

    courses = db.query(CourseTable).all()

    course_list = []

    for course in courses:
        course_list.append(CoursesForAdmin(Courseid=course.Courseid,
                                           Coursename=course.Coursename))

    return course_list


def get_faculties(db: database_dependency):
    """
    db : database dependency

    returns : list of all faculties
    """

    faculties = db.query(FacultyTable).all()

    faculty_list = []

    for faculty in faculties:
        faculty_name = faculty.Facultyfirstname + " " + faculty.Facultylastname

        faculty_list.append(FacultyForAdmin(Facultyid=faculty.Facultyid,
                                            Facultyname=faculty_name))

    return faculty_list
