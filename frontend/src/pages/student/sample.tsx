import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Courseheader from "../../components/coursecompo";

function Sample() {
  return (
    <div>
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
        <div className="sample">
          <div className="sidebar">
            <Sidebar></Sidebar>
          </div>
          <div><Courseheader></Courseheader></div>
        </div>
      </div>
    </div>
  );
}

export default Sample;
