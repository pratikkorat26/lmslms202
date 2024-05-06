import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import DashboardCard from "../../components/dashboardcardstudent";
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Interface} from "node:readline";
import FacultySidebar from "../../components/facultysidebar";
import DashboardCardFaculty from "../../components/facultydashboardcard";
interface Assignment {
    Courseid: string;
    Coursename: string;
    Assignmentid: string;
    Assignmentname: string;
    Assignmentdescription: string;
}

interface Quiz {
    Courseid: string;
    Coursename: string;
    Quizid: string;
    Quizname: string;
    Quizdescription: string;
}

interface Announcement {
    Courseid: string;
    Coursename: string;
    Announcementid: string;
    Announcementname: string;
    Announcementdescription: string;
}

interface Grade {
    Studentid: string
    Courseid: string;
    Coursename: string;
    EnrollmentGrades: string;
    EnrollmentSemester: string;
}

interface Content {
    Courseid : string
    Coursename : string
    Coursedescription : string
    Coursesemester : string

}

interface Course {
  Courseid: string;
  Coursename: string;
  Coursedescription: string;
  Coursesemester: string;
  Coursepublished: boolean; // Add this property
}

function CourseFaculty() {
    const courseid = useParams().courseid;
    localStorage.setItem("courseid", courseid || "");

    const [currentSemesterData, setCurrentSemesterData] = useState<Course[]>([]); // Explicitly define type as Course[]

    const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Course[]>(
        "http://127.0.0.1:8000/faculty/courses_taught",
        {
          // Specify the response type as Course[]
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const currentSemesterCourses = response.data.filter(
          (course) => course.Coursesemester === "SPRING24"
        );


        setCurrentSemesterData(currentSemesterCourses);
        console.log(currentSemesterCourses);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

    useEffect(() => {
        fetchCourses();
    }, []);

return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* Dashboardpage-Start */}
      <div className="wrapper">
        <div
          className="overlay"
          onClick={(e) => document.body.classList.toggle("sidebar-open")}
        ></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="dashnoard-content">
          <div className="sidebar">
            <FacultySidebar/>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Faculty-Dashboard</h5>
              <h6>Go-Canvas</h6>
            </div>
            <Grid container spacing={3} className="grid-sections">
                {currentSemesterData.map((course, index) => (
                  <Grid
                    key={index}
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    className="courses-grid"
                  >
                    <DashboardCardFaculty
                      key={index}
                      courseid={course.Courseid}
                      coursename={course.Coursename}
                      coursedescription={course.Coursedescription}
                      coursesemester={course.Coursesemester}
                      buttondisabled={false}
                    />
                  </Grid>
                ))}
              </Grid>
          </div>
        </main>
      </div>
      {/* Dashboardpage-End */}
    </>
  );
}

export default CourseFaculty;
