import React from "react";
import { NavLink } from "react-router-dom";

function CourseSidebar() {
  return <>
  <nav className="navbar">
            <ul>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/faculty_dashboard"} title="Dashboard">Home</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/faculty_announcement"} title="Account">Announcments</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/faculty_assignment"} title="Courses">Assignments</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/faculty_grades"} title="Account">Grades</NavLink></li>
            </ul>
        </nav>
  </>;
}

export default CourseSidebar;
