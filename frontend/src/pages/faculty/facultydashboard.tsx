import React from "react";
import { Grid, SelectChangeEvent } from "@mui/material";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardCardFaculty from "../../components/facultydashboardcard";
function FacultyDashboard() {
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
                  <DashboardCardFaculty courseid={"2"} coursename={"Hllo"} coursedescription={"llol"} coursesemester={"FALL24"} buttondisabled={false}/>
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
                        <DashboardCardFaculty courseid={"2"} coursename={"Hllo"} coursedescription={"llol"} coursesemester={"FALL24"} buttondisabled={false}/>
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

export default FacultyDashboard;
