import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return <>
  <nav className="navbar">
            <ul>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/admin_dashboard"} title="Dashboard">Dashboard</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/assign_course"} title="Account">Courses</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/student_list"} title="Courses">Students</NavLink></li>
            </ul>
        </nav>
  </>;
}

export default AdminSidebar;
