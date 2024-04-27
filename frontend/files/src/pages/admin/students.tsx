import React from "react";
import { Helmet } from "react-helmet";
import AdminSidebar from "../../components/adminsidebar";
import Header from "../../components/header";

function StudnetList(){
return(<>
    <Helmet>
      <title>Student</title>
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
            <h5>Students</h5>
            <h6>Go-Canvas</h6>
          </div>
        </div>
      </main>
    </div>
  </>)
}

export default StudnetList;