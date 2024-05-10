from typing import List

from fastapi import HTTPException
from sqlalchemy import text

from alphagocanvas.api.models.faculty import CoursesByFaculty, AddSyllabusRequest, AddSyllabusResponse, \
    StudentGradeFaculty, StudentGradeFacultyResponse, QuizRequestFacultyResponse, \
    QuizRequestFacultyRequest, AssignmentRequestFacultyRequest, AssignmentRequestFacultyResponse, \
    AnnouncementRequestFacultyRequest, AnnouncementRequestFacultyResponse, AssignmentResponse, QuizResponse, \
    AnnouncementResponse, FacultyCourseDetails
from alphagocanvas.api.models.student import StudentInformationDetails, CourseStudentGrade
from alphagocanvas.database import database_dependency
from alphagocanvas.database.models import CourseFacultyTable, StudentEnrollmentTable, QuizTable, AssignmentTable, \
    AnnouncementTable


def get_courses_by_faculty(db: database_dependency, facultyid: int) -> List[CoursesByFaculty]:
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


def update_syllabus_description(db: database_dependency, facultyid: int, params: AddSyllabusRequest):
    """
    Update syllabus description for a specific course.

    :param db: database connection
    :param facultyid: faculty id for course identification
    :param params: AddSyllabusRequest object containing course information and new syllabus description
    :return: response message
    """
    existing_record = db.query(CourseFacultyTable).filter(
        CourseFacultyTable.Coursefacultyid == facultyid,
        CourseFacultyTable.Coursecourseid == params.Courseid,
        CourseFacultyTable.Coursesemester == params.Coursesemester
    ).first()

    if not existing_record:
        raise HTTPException(status_code=404, detail="Given course does not exist")

    existing_record.Coursedescription = params.Coursedescription
    db.commit()

    return AddSyllabusResponse(Success="Syllabus description for the given course has been updated successfully")


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
            se.EnrollmentSemester,
            se.EnrollmentGrades
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
                                                       Coursesemester=student.EnrollmentSemester,
                                                       Coursegrade=student.EnrollmentGrades))

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

    return AnnouncementRequestFacultyResponse(Success="Announcement has been updated successfully")


def get_assignments_by_courseid(db: database_dependency, courseid: int) -> List[AssignmentResponse]:
    """
    Fetch assignments for a specific course based on courseid.

    :param db: SQLAlchemy Session object
    :param courseid: Course ID
    :return: List of assignments
    """
    raw_query = """
        SELECT a.Assignmentid, a.Assignmentname, a.AssignmentDescription, a.Courseid
        FROM Assignments a
        WHERE a.Courseid = :courseid;
    """

    results = db.execute(text(raw_query), {"courseid": courseid})
    assignments = results.fetchall()

    assignments_list = []
    for assignment in assignments:
        assignment_response = AssignmentResponse(
            Assignmentid=assignment.Assignmentid,
            Assignmentname=assignment.Assignmentname,
            Assignmentdescription=assignment.AssignmentDescription,
            Courseid=assignment.Courseid
        )
        assignments_list.append(assignment_response)

    return assignments_list


def get_quizzes_by_courseid(db: database_dependency, courseid: int) -> List[QuizResponse]:
    """
    Fetch quizzes for a specific course based on courseid.

    :param db: SQLAlchemy Session object
    :param courseid: Course ID
    :return: List of quizzes
    """
    raw_query = """
        SELECT q.Quizid, q.Quizname, q.QuizDescription, q.Courseid
        FROM Quizzes q
        WHERE q.Courseid = :courseid;
    """

    results = db.execute(text(raw_query), {"courseid": courseid})
    quizzes = results.fetchall()

    quizzes_list = []
    for quiz in quizzes:
        quiz_response = QuizResponse(
            Quizid=quiz.Quizid,
            Quizname=quiz.Quizname,
            Quizdescription=quiz.QuizDescription,
            Courseid=quiz.Courseid
        )
        quizzes_list.append(quiz_response)

    return quizzes_list


def get_announcements_by_courseid(db: database_dependency, courseid: int) -> List[AnnouncementResponse]:
    """
    Fetch announcements for a specific course based on courseid.

    :param db: SQLAlchemy Session object
    :param courseid: Course ID
    :return: List of announcements
    """
    raw_query = """
        SELECT ann.Announcementid, ann.Announcementname, ann.AnnouncementDescription, ann.Courseid
        FROM Announcements ann
        WHERE ann.Courseid = :courseid;
    """

    results = db.execute(text(raw_query), {"courseid": courseid})
    announcements = results.fetchall()

    announcements_list = []
    for announcement in announcements:
        announcement_response = AnnouncementResponse(
            Announcementid=announcement.Announcementid,
            Announcementname=announcement.Announcementname,
            Announcementdescription=announcement.AnnouncementDescription,
            Courseid=announcement.Courseid
        )
        announcements_list.append(announcement_response)

    return announcements_list


def get_course_faculty_details(db: database_dependency, courseid: int) -> List[FacultyCourseDetails]:
    raw_query = text("""
        SELECT
            cf.Coursecourseid,
            cf.Coursesemester,
            cf.Coursedescription
        FROM
            coursefaculty cf
        WHERE
            cf.Coursecourseid = :courseid AND cf.Coursepublished = TRUE;
        """)

    published_courses = db.execute(raw_query, {"courseid": courseid}).fetchall()

    if len(published_courses) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    published_courses_list = []

    for course in published_courses:
        published_courses_list.append(FacultyCourseDetails(
            Coursecourseid=course.Coursecourseid,
            Coursesemester=course.Coursesemester,
            Coursedescription=course.Coursedescription
        ))

    return published_courses_list
