import React from "react";
import FacultySidebar from "../../components/facultysidebar";
import { Helmet } from "react-helmet";
import Header from "../../components/header";

function AddGrades() {
  return (
    <>
      <Helmet>
        <title>Grades-Faculty</title>
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
              <h5>Grades</h5>
              <h6>Go-Canvas</h6>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddGrades;
