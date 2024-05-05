import React, {useEffect} from "react";
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

function CourseFaculty() {


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
            <FacultySidebar></FacultySidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Faculty-Dashboard</h5>
              <h6>Go-Canvas</h6>
            </div>
            <Grid container spacing={3} className="grid-sections">
              <Grid
                item
                md={12}
                lg={12}
                spacing={3}
                container
                className="grid-section-1"
              >
                <Grid item sm={12} md={4} lg={4} className="courses-grid">
                  <DashboardCardFaculty courseid={"1"} coursename={"Hllo"} coursedescription={"llol"} coursesemester={"FALL24"} buttondisabled={false}/>
                </Grid>
                <Grid item sm={12} md={4} lg={4} className="courses-grid">
                  <DashboardCardFaculty courseid={"1"} coursename={"Hllo"} coursedescription={"llol"} coursesemester={"FALL24"} buttondisabled={false}/>
                </Grid>
              </Grid>
            </Grid>
            <div className="dashboard-dropdown">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Previous Semesters
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3} className="grid-sections">
                    <Grid
                      item
                      md={12}
                      lg={12}
                      spacing={3}
                      container
                      className="grid-section-1"
                    >
                      <Grid item sm={12} md={4} lg={4} className="courses-grid">
                        <DashboardCardFaculty courseid={"1"} coursename={"Hllo"} coursedescription={"llol"} coursesemester={"FALL24"} buttondisabled={false}/>
                      </Grid>
                      <Grid item sm={12} md={4} lg={4} className="courses-grid">
                        <DashboardCardFaculty courseid={"1"} coursename={"Hllo"} coursedescription={"llol"} coursesemester={"FALL24"} buttondisabled={false}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </main>
      </div>
      {/* Dashboardpage-End */}
    </>
  );
}

export default CourseFaculty;
