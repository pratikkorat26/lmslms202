from typing import List
from fastapi import HTTPException
from alphagocanvas.api.models.faculty import CoursesByFaculty, AddSyllabusRequest, AddSyllabusResponse, \
    StudentGradeFaculty, StudentGradeFacultyResponse, QuizRequestFacultyResponse, \
    QuizRequestFacultyRequest, AssignmentRequestFacultyRequest, AssignmentRequestFacultyResponse, \
    AnnouncementRequestFacultyRequest, AnnouncementRequestFacultyResponse
from alphagocanvas.api.models.student import StudentInformationCourses, StudentInformationDetails, CourseStudentGrade
from alphagocanvas.database import database_dependency
from sqlalchemy import text

from alphagocanvas.database.models import CourseFacultyTable, StudentEnrollmentTable, QuizTable, AssignmentTable, \
    AnnouncementTable


def get_courses_by_faculty(db: database_dependency, facultyid : int) -> List[CoursesByFaculty]:
    """

    :param db: database dependency object, which will retrieve the object

    :return: List[AdminCoursesByFaculty] (List of Json objects)
    """

    raw_query = text(
        """
    SELECT 
        c.Courseid, c.Coursename, cf.Coursesemester, f.Facultyfirstname, f.Facultylastname, f.Facultyid, cf.Coursepublished
    FROM 
        coursefaculty cf
    JOIN 
        courses c ON cf.Coursecourseid = c.Courseid
    JOIN 
        faculty f ON cf.Coursefacultyid = f.Facultyid
    WHERE
        f.Facultyid = :facultyid;"""
    )

    courses = db.execute(raw_query, {"facultyid": facultyid}).fetchall()
    courses_list = []

    print(courses)
    # check if courses are not null, if yes, then raise error
    if len(courses) == 0:
        raise HTTPException(status_code=404, detail="Data not found")
    for course in courses:
        if course.Coursepublished is None:
            course.Coursepublished = False

        courses_list.append(CoursesByFaculty(Courseid=course.Courseid,
                                             Coursename=course.Coursename,
                                             Facultyfirstname=course.Facultyfirstname,
                                             Facultyid=course.Facultyid,
                                             Facultylastname=course.Facultylastname,
                                             Coursesemester=course.Coursesemester,
                                             Coursepublished=course.Coursepublished))

    return courses_list


def add_syllabus_to_course(db: database_dependency, facultyid: int, params: AddSyllabusRequest):
    """

    :param db: database connection
    :param facultyid: faculty id for the identification for the course
    :param params: AddSyllabusRequest object for filtering
    :return: AddSyllabusResponse object
    """
    if not params:
        raise HTTPException(status_code=404, detail="Data is not passed, Please pass the true value")

    course_faculty = CourseFacultyTable(
        Coursefacultyid=facultyid,
        Coursecourseid=params.Courseid,
        Coursesemester=params.Coursesemester
    )

    if not course_faculty:
        raise HTTPException(status_code=404, detail="Data not found, Or You are not teaching this course")

    existing_record = db.query(CourseFacultyTable).filter(
        CourseFacultyTable.Coursefacultyid == facultyid,
        CourseFacultyTable.Coursecourseid == params.Courseid,
        CourseFacultyTable.Coursesemester == params.Coursesemester
    ).first()

    if not existing_record:
        raise HTTPException(status_code=404, detail="Given course does not exist")

    else:
        existing_record.Coursedescription = params.Coursedescription
        db.commit()

    return AddSyllabusResponse(Success="Course content for given course has been updated successfully")


def view_students_for_each_course(db: database_dependency, courseid: int) -> List[StudentInformationDetails]:
    """

    :param db: database connection for retrieving objects from database
    :param courseid: courseid of the course
    :return: List[StudentInformationCourses]
    """
    raw_query = text(
        """
        SELECT 
            se.Studentid,
            CONCAT(s.Studentfirstname, ' ', s.Studentlastname) AS Studentname,
            s.Studentcontactnumber,
            c.Coursename,
            se.EnrollmentSemester
        FROM 
            studentenrollment se
        JOIN 
            student s ON se.Studentid = s.Studentid
        JOIN 
            courses c ON se.Courseid = c.Courseid
        WHERE 
            se.Courseid = :courseid;
        """
    )

    students = db.execute(raw_query, {"courseid": courseid}).fetchall()

    if not students:
        raise HTTPException(status_code=404, detail="No students are enrolled in that course")

    students_list = []
    for student in students:
        students_list.append(StudentInformationDetails(Studentid=student.Studentid,
                                                       Studentname=student.Studentname,
                                                       Studentcontactnumber=student.Studentcontactnumber,
                                                       Coursename=student.Coursename,
                                                       Coursesemester=student.EnrollmentSemester))

    return students_list


def view_students_for_each_course_service(db: database_dependency, courseid: int) -> List[CourseStudentGrade]:
    """

    :param db: database connection for retrieving students
    :param courseid: courseid for filtering all students for grade
    :return:
    """
    raw_query = text(
        """
        SELECT
            se.Studentid,
            se.EnrollmentGrades,
            CONCAT(s.Studentfirstname, ' ', s.Studentlastname) AS Studentname,
            se.EnrollmentSemester,
            c.Coursename
        FROM
            studentenrollment se
        JOIN
            student s ON se.Studentid = s.Studentid
        JOIN
           courses c ON se.Courseid = c.Courseid
        WHERE
            se.Courseid = :courseid;
        """
    )

    students = db.execute(raw_query, {"courseid": courseid}).fetchall()

    if not students:
        raise HTTPException(status_code=404, detail="No grades found for that courses")

    students_grade_list = []
    """
    Studentid: int
    EnrollmentGrades: str
    
    EnrollmentSemester: str
    Coursename: str"""
    for student in students:
        students_grade_list.append(CourseStudentGrade(Studentid=student.Studentid,
                                                      EnrollmentGrades=student.EnrollmentGrades,
                                                      Studentname=student.Studentname,
                                                      EnrollmentSemester=student.EnrollmentSemester,
                                                      Coursename=student.Coursename))

    return students_grade_list


def update_grade_students(facultyid: int, params: StudentGradeFaculty, db: database_dependency) \
        -> StudentGradeFacultyResponse:
    """

    :param facultyid: faculty id of the faculty for which courses they are teaching
    :param params: StudentGradeFaculty
    :param db: database dependency objects
    :return:
    """

    existing_record = db.query(StudentEnrollmentTable).filter(
        StudentEnrollmentTable.Studentid == params.Studentid,
        StudentEnrollmentTable.Courseid == params.Courseid,
        StudentEnrollmentTable.EnrollmentSemester == params.Semester
    ).first()

    if not existing_record:
        raise HTTPException(status_code=404, detail="Student is not founded with that course in given semester")

    if existing_record.Facultyid != facultyid:
        raise HTTPException(status_code=401,
                            detail="This student can not be graded by you, since it is not enrolled in your course")

    if existing_record and existing_record.Facultyid == facultyid:
        existing_record.EnrollmentGrades = params.Grade
        db.commit()

    return StudentGradeFacultyResponse(Success="Grades has been updated successfully")


def add_quiz_to_course(params: QuizRequestFacultyRequest, facultyid: int,
                       db: database_dependency) -> QuizRequestFacultyResponse:
    """

    :param params: QuizRequestFaculty object
    :param facultyid: facultyid for filtering courses based on facultyid
    :param db: database dependency objects
    :return:
    """
    existing_record = db.query(CourseFacultyTable).filter(
        CourseFacultyTable.Coursefacultyid == facultyid,
        CourseFacultyTable.Coursecourseid == params.Courseid,
        CourseFacultyTable.Coursesemester == params.Semester
    ).first()

    if not existing_record:
        raise HTTPException(status_code=404,
                            detail="Quiz can not be added to this course by you, check Semester, Course")

    """
    quizname = Column(String)
    quizdescription = Column(Text)
    Courseid = Column(Integer, ForeignKey('courses.Courseid'))"""

    if existing_record:
        new_record = QuizTable(
            quizname=params.Quizname,
            quizdescription=params.Quizdescription,
            Courseid=params.Courseid
        )
        db.add(new_record)
        db.commit()
        db.refresh(new_record)

    return QuizRequestFacultyResponse(Success="Quiz has been updated successfully")


def add_assignment_to_course(params: AssignmentRequestFacultyRequest,
                             facultyid: int,
                             db: database_dependency) -> AssignmentRequestFacultyResponse:
    """

    :param params: AssignmentRequestFaculty object
    :param facultyid: facultyid for filtering courses based on facultyid
    :param db: database dependency objects
    :return:
    """
    existing_record = db.query(CourseFacultyTable).filter(
        CourseFacultyTable.Coursefacultyid == facultyid,
        CourseFacultyTable.Coursecourseid == params.Courseid,
        CourseFacultyTable.Coursesemester == params.Semester
    ).first()

    if not existing_record:
        raise HTTPException(status_code=404,
                            detail="Assignment can not be added to this course by you, check Semester, Course")

    if existing_record:
        new_record = AssignmentTable(
            Assignmentname=params.Assignmentname,
            Assignmentdescription=params.Assignmentdescription,
            Courseid=params.Courseid
        )
        db.add(new_record)
        db.commit()
        db.refresh(new_record)

    return AssignmentRequestFacultyResponse(Success="Assignment has been updated successfully")


def add_announcement_to_course(params: AnnouncementRequestFacultyRequest,
                               facultyid: int,
                               db: database_dependency) -> AnnouncementRequestFacultyResponse:
    """

    :param params: AssignmentRequestFaculty object
    :param facultyid: facultyid for filtering courses based on facultyid
    :param db: database dependency objects
    :return:
    """
    existing_record = db.query(CourseFacultyTable).filter(
        CourseFacultyTable.Coursefacultyid == facultyid,
        CourseFacultyTable.Coursecourseid == params.Courseid,
        CourseFacultyTable.Coursesemester == params.Semester
    ).first()

    if not existing_record:
        raise HTTPException(status_code=404,
                            detail="Assignment can not be added to this course by you, check Semester, Course")

    """
    AnnouncementTable
    
    Announcementid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Announcementname = Column(String)
    Announcementdescription = Column(String)
    Courseid = Column(String)
    
    """
    if existing_record:
        new_record = AnnouncementTable(
            Announcementname=params.Announcementname,
            Announcementdescription=params.Announcementdescription,
            Courseid=params.Courseid
        )

        db.add(new_record)
        db.commit()
        db.refresh(new_record)

    return AnnouncementRequestFacultyResponse(Success="Assignment has been updated successfully")
