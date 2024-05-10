from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class UserTable(Base):
    """
    Table for users which is actually represents the database user table in actual database.
    """
    __tablename__ = 'usertable'
    Userid = Column(Integer, primary_key=True)
    Useremail = Column(String)
    Userpassword = Column(String)
    Userrole = Column(String)


class StudentTable(Base):
    """
    Table for students which is actually
    """
    __tablename__ = 'student'
    Studentid = Column(Integer, primary_key=True)
    Studentfirstname = Column(String)
    Studentlastname = Column(String)
    Studentcontactnumber = Column(String)
    Studentnotification = Column(Boolean)


class StudentEnrollmentTable(Base):
    """
    Table for students enrollments
    """
    __tablename__ = 'studentenrollment'
    Enrollmentid = Column(Integer, primary_key=True)
    Studentid = Column(Integer, ForeignKey('student.Studentid'))
    Courseid = Column(Integer, ForeignKey('courses.Courseid'))
    EnrollmentSemester = Column(String)
    EnrollmentGrades = Column(String)
    Facultyid = Column(String, ForeignKey('faculty.Facultyid'))


class CourseTable(Base):
    __tablename__ = 'courses'
    Courseid = Column(Integer, primary_key=True, index=True)
    Coursename = Column(String)


class GradeTable(Base):
    """
    Table for grades which is actually
    """
    __tablename__ = 'grades'
    Gradeid = Column(Integer, primary_key=True, index=True)
    Studentid = Column(Integer, ForeignKey('student.Studentid'))
    Courseid = Column(Integer, ForeignKey('course.Courseid'))


class FacultyTable(Base):
    __tablename__ = 'faculty'

    Facultyid = Column(Integer, primary_key=True, index=True, onupdate="CASCADE")
    Facultyfirstname = Column(String)
    Facultylastname = Column(String)


class AssignmentTable(Base):
    __tablename__ = 'assignments'
    Assignmentid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Assignmentname = Column(String)
    Assignmentdescription = Column(Text)
    Courseid = Column(Integer, ForeignKey('courses.Courseid'))


class QuizTable(Base):
    __tablename__ = 'quizzes'
    quizid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    quizname = Column(String)
    quizdescription = Column(Text)
    Courseid = Column(Integer, ForeignKey('courses.Courseid'))


class CourseFacultyTable(Base):
    __tablename__ = 'coursefaculty'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Coursefacultyid = Column(Integer, ForeignKey('faculty.Facultyid'))
    Coursecourseid = Column(Integer, ForeignKey("courses.Courseid"))
    Coursesemester = Column(String)
    Coursepublished = Column(Boolean)
    Coursedescription = Column(String)


class AnnouncementTable(Base):
    __tablename__ = "announcements"
    Announcementid = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Announcementname = Column(String)
    Announcementdescription = Column(String)
    Courseid = Column(String)
