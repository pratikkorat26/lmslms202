import React, {useEffect, useState} from "react";
import FacultySidebar from "../../components/facultysidebar";
import Header from "../../components/header";
import {Helmet} from "react-helmet";
import {useParams} from "react-router-dom";
import axios from "axios";
import StudentTable from "../../components/facultystudenttable";

function CourseStudentList() {
    const token = localStorage.getItem("token");
    const {courseid} = useParams();
    const [students, setStudents] = useState([]);

        const fetchStudents = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/faculty/view_students?courseid=${courseid}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    setStudents(response.data);
                } else {
                    console.error("Failed to fetch students:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
    useEffect(() => {
        fetchStudents();
    }, [token, courseid]);


    return (
        <>
            <Helmet>
                <title>Students</title>
            </Helmet>
            {/* Dashboardpage-Start */}
            <div className="wrapper">
                <div
                    className="overlay"
                    onClick={(e) => document.body.classList.toggle("sidebar-open")}
                ></div>
                <Header></Header>
                <div className="main-background"></div>
                <main className="dashboard-content">
                    <div className="sidebar">
                        <FacultySidebar></FacultySidebar>
                    </div>
                    <div className="main-content">
                        <div className="main-title">
                            <h5>Students</h5>
                            <h6>Go-Canvas</h6>
                        </div>
                        <StudentTable students={students}></StudentTable>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CourseStudentList;