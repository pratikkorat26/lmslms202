import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";
import FacultySidebar from "../../components/facultysidebar";

interface Student {
  Studentid: number;
  Studentname: string;
}

function AssignGrades() {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number>(-1);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [anchorElStudent, setAnchorElStudent] = useState<null | HTMLElement>(
    null
  );
  const [anchorElGrade, setAnchorElGrade] = useState<null | HTMLElement>(
    null
  );
  const openStudent = Boolean(anchorElStudent);
  const openGrade = Boolean(anchorElGrade);
  const token = localStorage.getItem("token");
  const { courseid } = useParams();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/faculty/view_students?courseid=${courseid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setStudentList(response.data);
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token, courseid]);

  const handleStudentClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStudent(event.currentTarget);
  };

  const handleStudentClose = () => {
    setAnchorElStudent(null);
  };

  const handleGradeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElGrade(event.currentTarget);
  };

  const handleGradeClose = () => {
    setAnchorElGrade(null);
  };

  const handleStudentSelect = (studentId: number, studentName: string) => {
    setSelectedStudent(studentId);
    handleStudentClose();
  };

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    handleGradeClose();
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/faculty/assign_grades",
        {
          Studentid: selectedStudent,
          Courseid: courseid,
          Semester: "SPRING24", // Assuming Semester is fixed
          Grade: selectedGrade,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Data saved successfully:", response.data);
        setSelectedStudent(-1);
        setSelectedGrade("");
        window.alert("Grade Successfully Assigned");
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
        <title>Assign-Grades</title>
      </Helmet>
      <div className="wrapper">
        <div
          className="overlay"
          onClick={(e) => document.body.classList.toggle("sidebar-open")}
        ></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="dashboard-content">
          <div className="sidebar">
            <FacultySidebar></FacultySidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Assign-Grade</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                justifyContent: "space-around",
              }}
            >
              <div style={{ marginLeft: "30px" }}>
                <Button
                  id="student-button"
                  variant="outlined"
                  aria-controls={openStudent ? "student-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleStudentClick}
                >
                  {selectedStudent !== -1
                    ? studentList.find(
                        (student) => student.Studentid === selectedStudent
                      )?.Studentname
                    : "Select Student"}
                </Button>
                <Menu
                  id="student-menu"
                  anchorEl={anchorElStudent}
                  open={openStudent}
                  onClose={handleStudentClose}
                >
                  {studentList.map((student) => (
                    <MenuItem
                      key={student.Studentid}
                      onClick={() =>
                        handleStudentSelect(
                          student.Studentid,
                          student.Studentname
                        )
                      }
                    >
                      {student.Studentname}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div style={{ marginLeft: "30px" }}>
                <Button
                  id="grade-button"
                  variant="outlined"
                  aria-controls={openGrade ? "grade-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleGradeClick}
                >
                  {selectedGrade || "Select Grade"}
                </Button>
                <Menu
                  id="grade-menu"
                  anchorEl={anchorElGrade}
                  open={openGrade}
                  onClose={handleGradeClose}
                >
                  {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D"].map(
                    (grade) => (
                      <MenuItem key={grade} onClick={() => handleGradeSelect(grade)}>
                        {grade}
                      </MenuItem>
                    )
                  )}
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

export default AssignGrades;
