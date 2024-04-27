import React from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import Courseheader from "../../components/coursecompo";


function CourseHomepage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Course</title>
      </Helmet>
      {/* Dashboardpage-Start */}
      <div className="wrapper">
        <div
          className="overlay"
          onClick={(e) => document.body.classList.toggle("sidebar-open")}
        ></div>
        <div
          className="search-overlay"
          onClick={(e) => document.body.classList.toggle("search-open")}
        ></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="course-content">
          <div className="sidebar course-sidebar">
            <Sidebar></Sidebar>
          </div>
          <div className="main-content">
            <Courseheader></Courseheader>
          </div>
        </main>
      </div>
      {/* Dashboardpage-End */}
    </>
  );
}

export default CourseHomepage;
