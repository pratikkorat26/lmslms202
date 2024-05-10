from typing import List

from fastapi import HTTPException
from sqlalchemy import text

from alphagocanvas.api.models.student import StudentGrades, StudentInformation, StudentEnrollment, StudentCourseDetails, \
    StudentAssignments, StudentQuizzes, StudentAnnouncements
from alphagocanvas.database import database_dependency
from alphagocanvas.database.models import StudentTable


def get_student(studentid: int, db: database_dependency) -> StudentInformation:
    """
    :param studentid: student id unique
    :param db: database_dependency
    :return: retrieved data from the database
    """

    student = db.query(StudentTable).filter(StudentTable.Studentid == studentid).first()

    return student


def update_student(studentid: int, studentdata: StudentInformation, db: database_dependency) -> StudentInformation:
    """

    :param studentid: student id obtained from token
    :param studentdata: student data receive from request body
    :param db: database dependency object
    :return: queried data from the database
    """
    data = db.get(StudentTable, studentid)

    if (studentdata.Studentfirstname != "" or
            studentdata.Studentfirstname is not None or not studentdata.Studentfirstname):
        # setattr(data, StudentTable.Studentfirstname, studentdata.Studentfirstname)
        data.Studentfirstname = studentdata.Studentfirstname
    if (studentdata.Studentlastname != "" or
            studentdata.Studentlastname is not None or not studentdata.Studentlastname):
        # setattr(data, StudentTable.Studentlastname, studentdata.Studentlastname)
        data.Studentlastname = studentdata.Studentlastname
    if (studentdata.Studentcontactnumber != ""
            or studentdata.Studentcontactnumber is not None or not studentdata.Studentcontactnumber):
        # setattr(data, StudentTable.Studentcontactnumber, studentdata.Studentcontactnumber)
        data.Studentcontactnumber = studentdata.Studentcontactnumber

    if (studentdata.Studentcontactnumber != ""
            or studentdata.Studentcontactnumber is not None or not studentdata.Studentcontactnumber):
        data.Studentnotification = studentdata.Studentnotification

    db.commit()
    db.refresh(data)

    return data


def get_grades(studentid: int, db: database_dependency, current_semester: str) -> List[StudentGrades]:
    """

    :param studentid: student id retrieve from the token
    :param db: database dependency for fetching the information
    :param current_semester: which is the current semester
    :return:
    """
    raw_query = """
        SELECT 
            studentenrollment.Studentid,
            studentenrollment.EnrollmentSemester,
            studentenrollment.EnrollmentGrades,
            courses.Coursename,
            courses.Courseid
        FROM 
            studentenrollment
        JOIN 
            courses ON studentenrollment.Courseid = courses.Courseid
        WHERE 
            studentenrollment.Studentid = :studentid and studentenrollment.EnrollmentSemester = :current_semester
        """

    results = db.execute(text(raw_query), {"studentid": studentid, "current_semester": current_semester})

    grades = results.fetchall()
    graded_list = []

    if len(grades) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    if len(grades) != 0:
        for grade in grades:
            graded_list.append(StudentGrades(Studentid=grade.Studentid,
                                             Courseid=grade.Courseid,
                                             Coursename=grade.Coursename,
                                             EnrollmentGrades=grade.EnrollmentGrades,
                                             EnrollmentSemester=grade.EnrollmentSemester))

    return graded_list


def get_enrollments(studentid: int, db: database_dependency) -> List[StudentEnrollment]:
    """

    :param studentid:
    :param db:
    :return:
    """
    raw_query = """
    SELECT 
        studentenrollment.Studentid,
        studentenrollment.EnrollmentSemester,
        courses.Coursename,
        courses.Courseid
    FROM 
        studentenrollment
    JOIN 
        courses ON studentenrollment.Courseid = courses.Courseid
    WHERE
        studentenrollment.Studentid = :studentid
    """

    results = db.execute(text(raw_query), {"studentid": studentid})
    # Fetch all results
    enrollments = results.fetchall()

    enrollments_list = []

    if len(enrollments) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    for enrollment in enrollments:
        enrollments_list.append(StudentEnrollment(Studentid=enrollment.Studentid,
                                                  Courseid=enrollment.Courseid,
                                                  Coursename=enrollment.Coursename,
                                                  EnrollmentSemester=enrollment.EnrollmentSemester))
    return enrollments_list


def get_course_details(db: database_dependency, studentid: int) -> List[StudentCourseDetails]:
    """
    :param db: database dependency object
    :return: List[StudentCourseDetails]
    """

    raw_query = text("""
        SELECT
            c.*,
            se.EnrollmentSemester,
            cf.Coursepublished,
            cf.Coursedescription
        FROM
            courses c
        JOIN
            studentenrollment se ON c.Courseid = se.Courseid
        JOIN
            coursefaculty cf ON c.Courseid = cf.Coursecourseid
        WHERE
            cf.Coursepublished = TRUE AND se.Studentid = :student_id;
        """)

    published_courses = db.execute(raw_query, {"student_id": studentid}).fetchall()

    print(published_courses)
    if len(published_courses) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    published_courses_list = []

    for course in published_courses:
        published_courses_list.append(StudentCourseDetails(
            Courseid=course.Courseid,
            Coursename=course.Coursename,
            Coursedescription=course.Coursedescription,
            Coursesemester=course.EnrollmentSemester
        ))

    return published_courses_list


def get_published_assignments(db: database_dependency, studentid: int, current_semester: str) -> List[
    StudentAssignments]:
    """

    :param db:
    :param studentid:
    :param current_semester:
    :return:
    """
    # Assuming db is your SQLAlchemy Session object

    raw_query = """
        SELECT
            c.Coursename,
            a.Courseid,
            a.Assignmentid,
            a.Assignmentname,
            a.Assignmentdescription,
            cf.Coursepublished,
            se.Studentid
        FROM
            courses c
        JOIN
            assignments a ON c.Courseid = a.Courseid
        JOIN
            studentenrollment se ON c.Courseid = se.Courseid
        JOIN 
            coursefaculty cf on c.Courseid = cf.Coursecourseid
        WHERE
            cf.Coursepublished = TRUE
        AND
            se.Studentid = :studentid
        AND
            se.EnrollmentSemester = :current_semester;
        """

    print(studentid, current_semester)
    results = db.execute(text(raw_query), {"studentid": studentid, "current_semester": current_semester})
    assignments = results.fetchall()

    assignments_list = []
    # Process the results as needed
    if len(assignments) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    for assignment in assignments:
        assignments_list.append(StudentAssignments(Courseid=assignment.Courseid,
                                                   Coursename=assignment.Coursename,
                                                   Assignmentid=assignment.Assignmentid,
                                                   Assignmentname=assignment.Assignmentname,
                                                   Assignmentdescription=assignment.Assignmentdescription,
                                                   ))

    return assignments_list


def get_published_quizzes(db: database_dependency, studentid: int, current_semester: str) -> List[StudentQuizzes]:
    """

        :param db: database dependency
        :param studentid: current student id
        :param current_semester: current semester
        :return: List[StudentQuizzes]
    """

    raw_query = """ 
    SELECT
        c.Coursename,
        q.Courseid,
        q.Quizid,
        q.Quizname,
        q.Quizdescription,
        cf.Coursepublished,
        se.Studentid
    FROM
        courses c
    JOIN
        quizzes q ON c.Courseid = q.Courseid
    JOIN
        studentenrollment se ON c.Courseid = se.Courseid
    JOIN
        coursefaculty cf on c.Courseid = cf.Coursecourseid
    WHERE
        cf.Coursepublished = TRUE
    AND
        se.Studentid = :studentid
    AND
       se.EnrollmentSemester = :current_semester;
    """

    results = db.execute(text(raw_query), {"studentid": studentid, "current_semester": current_semester})

    quizzes = results.fetchall()
    quizzes_list = []

    if len(quizzes) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    for quiz in quizzes:
        quizzes_list.append(StudentQuizzes(Courseid=quiz.Courseid,
                                           Coursename=quiz.Coursename,
                                           Quizid=quiz.Quizid,
                                           Quizname=quiz.Quizname,
                                           Quizdescription=quiz.Quizdescription))

    return quizzes_list


def get_published_announcement(db: database_dependency, studentid: int, current_semester: str) -> List[
    StudentAnnouncements]:
    """

            :param db: database dependency
            :param studentid: current student id
            :param current_semester: current semester
            :return: List[StudentAnnouncements]
    """

    raw_query = """ 
        SELECT
            c.Coursename,
            an.Courseid,
            an.Announcementid,
            an.Announcementname,
            an.Announcementdescription,
            cf.Coursepublished,
            se.Studentid
        FROM
            courses c
        JOIN
            announcements an ON c.Courseid = an.Courseid
        JOIN
            studentenrollment se ON c.Courseid = se.Courseid
        JOIN
            coursefaculty cf on c.Courseid = cf.Coursecourseid
        WHERE
            cf.Coursepublished = TRUE
        AND
            se.Studentid = :studentid
        AND
           se.EnrollmentSemester = :current_semester;
        """

    results = db.execute(text(raw_query), {"studentid": studentid, "current_semester": current_semester})

    announcements = results.fetchall()
    announcements_list = []

    if len(announcements) == 0:
        raise HTTPException(status_code=404, detail="Data not found")

    for announcement in announcements:
        announcements_list.append(StudentAnnouncements(Courseid=announcement.Courseid,
                                                       Coursename=announcement.Coursename,
                                                       Announcementid=announcement.Announcementid,
                                                       Announcementname=announcement.Announcementname,
                                                       Announcementdescription=announcement.Announcementdescription))

    return announcements_list
