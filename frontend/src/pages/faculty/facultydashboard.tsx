import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import DashboardCardFaculty from "../../components/facultydashboardcard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

interface Course {
  Courseid: string;
  Coursename: string;
  Coursedescription: string;
  Coursesemester: string;
  Coursepublished: boolean; // Add this property
}

function FacultyDashboard() {
  const [previousSemesterData, setPreviousSemesterData] = useState<Course[]>(
    []
  ); // Explicitly define type as Course[]
  const [currentSemesterData, setCurrentSemesterData] = useState<Course[]>([]); // Explicitly define type as Course[]
  const { courseid } = useParams();


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
        const previousSemesterCourses = response.data.filter(
          (course) => course.Coursesemester !== "SPRING24"
        );

        setCurrentSemesterData(currentSemesterCourses);
        setPreviousSemesterData(previousSemesterCourses);
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
        <title>Go-Canvas</title>
      </Helmet>
      <div className="wrapper">
        <div
          className="overlay"
          onClick={(e) => document.body.classList.toggle("sidebar-open")}
        ></div>
        <Header />
        <div className="main-background"></div>
        <main className="dashnoard-content">
          <div className="main-content" style={{flexBasis:'100%',maxWidth:'100%'}}>
            <div className="main-title">
              <h5>Dashboard</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div className="dashboard-dropdown">
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
                      buttondisabled={!course.Coursepublished}
                    />
                  </Grid>
                ))}
              </Grid>
              <Accordion style={{marginTop:'20px'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Previous Semesters
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3} className="grid-sections">
                    {previousSemesterData.map((course, index) => (
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
                          buttondisabled={!course.Coursepublished}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default FacultyDashboard;
