import React from "react";
import {NavLink, useParams} from "react-router-dom";

function FacultySidebar() {
  const { courseid } = useParams();

  return <>
  <nav className="navbar">
            <ul>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={"/faculty_dashboard/"} title="Dashboard">Home</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={`/faculty_syllabus/${courseid}`} title="Syllabus">Syllabus</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={`/faculty_announcement/${courseid}`} title="Announcments">Announcments</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={`/faculty_assignment/${courseid}`} title="Assignments">Assignments</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={`/faculty_quiz/${courseid}`} title="Quizzes">Quizzes</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={`/faculty_grades/${courseid}`} title="Grades">Grades</NavLink></li>
            <li><NavLink className="nav-link" onClick={e => document.body.classList.remove('sidebar-open')} to={`/students/${courseid}`} title="Students">Students</NavLink></li>
            </ul>
        </nav>
  </>;
}

export default FacultySidebar;
