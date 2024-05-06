import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AdminSidebar from "../../components/adminsidebar";
import Header from "../../components/header";
import axios from "axios";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import StudentTable from "../../components/table";


function StudentList() {
    const token = localStorage.getItem("token");
    const [studentsGrouped, setStudentsGrouped] = useState<{ [key: string]: any[] }>({});

    const fetchStudents = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/admin/view_student_information",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const students = response.data;

                const groupedStudents = students.reduce((acc: { [x: string]: any[]; }, curr: {
                    Coursename: string | number;
                }) => {
                    if (!acc[curr.Coursename]) {
                        acc[curr.Coursename] = [];
                    }
                    acc[curr.Coursename].push(curr);
                    return acc;
                }, {});

                setStudentsGrouped(groupedStudents);
                console.log(studentsGrouped);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
           <Helmet>
        <title>Admin-StudentList</title>
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
            <div className="content-container" style={{marginTop:'50px'}}>
                                {Object.entries(studentsGrouped).map(([courseName, students], index) => (
                                    <Accordion key={index} style={{margin:'15px 0', borderRadius:'5px'}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <h6>{courseName}</h6>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <StudentTable students={students} />
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
          </div>
        </main>
      </div>
        </>
    );
}

export default StudentList;
