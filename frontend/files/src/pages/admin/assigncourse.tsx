import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import AdminSidebar from "../../components/adminsidebar";

function AssignCourse() {
  return (<>
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
        </div>
      </main>
    </div>
  </>)
}

export default AssignCourse;
