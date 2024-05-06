import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import AdminSidebar from "../../components/adminsidebar";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface Faculty {
  Facultyid: number;
  Facultyname: string;
}

interface Course {
  Courseid: number;
  Coursename: string;
}

interface Semester {
  Coursesemester: string;
}

function AssignCourse() {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [semesterList, setSemesterList] = useState<Semester[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [anchorElFaculty, setAnchorElFaculty] = useState<null | HTMLElement>(
    null
  );
  const [anchorElCourse, setAnchorElCourse] = useState<null | HTMLElement>(
    null
  );
  const [anchorElSemester, setAnchorElSemester] = useState<null | HTMLElement>(
    null
  );
  const openFaculty = Boolean(anchorElFaculty);
  const openCourse = Boolean(anchorElCourse);
  const openSemester = Boolean(anchorElSemester);

  useEffect(() => {
    fetchFaculties();
    fetchCourses();
    fetchSemesters(); // Fetch semesters when component mounts
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/admin/view_faculties",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setFacultyList(response.data);
      } else {
        console.error("Error fetching faculties:", response.data);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/admin/view_courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCourseList(response.data);
      } else {
        console.error("Error fetching courses:", response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/admin/view_courses_by_faculty",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setSemesterList(response.data);
      } else {
        console.error("Error fetching semesters:", response.data);
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const handleFacultyClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFaculty(event.currentTarget);
  };

  const handleFacultyClose = () => {
    setAnchorElFaculty(null);
  };

  const handleCourseClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCourse(event.currentTarget);
  };

  const handleCourseClose = () => {
    setAnchorElCourse(null);
  };

  const handleSemesterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSemester(event.currentTarget);
  };

  const handleSemesterClose = () => {
    setAnchorElSemester(null);
  };

  const handleFacultySelect = (facultyId: number, facultyName: string) => {
    setSelectedFaculty(facultyId);
    handleFacultyClose();
  };

  const handleCourseSelect = (courseId: number, courseName: string) => {
    setSelectedCourse(courseId);
    handleCourseClose();
  };

  const handleSemesterSelect = (semester: string) => {
    setSelectedSemester(semester);
    handleSemesterClose();
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/admin/assign_course",
        {
          Courseid: selectedCourse,
          Facultyid: selectedFaculty,
          Coursesemester: selectedSemester,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Data saved successfully:", response.data);
        // Optionally, you can reset the selected values after saving
        setSelectedFaculty(null);
        setSelectedCourse(null);
        setSelectedSemester("");
      } else {
        console.error("Error saving data:", response.data);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin-Courses</title>
      </Helmet>
      <div className="wrapper">
        <div
          className="overlay"
          onClick={(e) => document.body.classList.toggle("sidebar-open")}
        ></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="dashnoard-content">
          <div className="sidebar">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Assign-Course</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Button
                  id="semester-button"
                  variant="outlined"
                  aria-controls={openSemester ? "semester-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleSemesterClick}
                >
                  {selectedSemester || "Select Semester"}
                </Button>
                <Menu
                  id="semester-menu"
                  anchorEl={anchorElSemester}
                  open={openSemester}
                  onClose={handleSemesterClose}
                >
                  {semesterList.map((semester) => (
                    <MenuItem
                      key={semester.Coursesemester}
                      onClick={() =>
                        handleSemesterSelect(semester.Coursesemester)
                      }
                    >
                      {semester.Coursesemester}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div style={{ marginLeft: "30px" }}>
                <Button
                  id="course-button"
                  variant="outlined"
                  aria-controls={openCourse ? "course-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleCourseClick}
                >
                  {selectedCourse ? courseList.find(course => course.Courseid === selectedCourse)?.Coursename : "Select Course"}
                </Button>
                <Menu
                  id="course-menu"
                  anchorEl={anchorElCourse}
                  open={openCourse}
                  onClose={handleCourseClose}
                >
                  {courseList.map((course) => (
                    <MenuItem
                      key={course.Courseid}
                      onClick={() =>
                        handleCourseSelect(course.Courseid, course.Coursename)
                      }
                    >
                      {course.Coursename}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div style={{ marginLeft: "30px" }}>
                <Button
                  id="faculty-button"
                  variant="outlined"
                  aria-controls={openFaculty ? "faculty-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleFacultyClick}
                >
                  {selectedFaculty ? facultyList.find(faculty => faculty.Facultyid === selectedFaculty)?.Facultyname : "Select Faculty"}
                </Button>
                <Menu
                  id="faculty-menu"
                  anchorEl={anchorElFaculty}
                  open={openFaculty}
                  onClose={handleFacultyClose}
                >
                  {facultyList.map((faculty) => (
                    <MenuItem
                      key={faculty.Facultyid}
                      onClick={() =>
                        handleFacultySelect(
                          faculty.Facultyid,
                          faculty.Facultyname
                        )
                      }
                    >
                      {faculty.Facultyname}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <Button
                variant="contained"
                style={{ marginLeft: "30px" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AssignCourse;
