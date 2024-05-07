import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import DashboardCard from "../../components/dashboardcardstudent";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Assignment {
    Courseid: string;
    Coursename: string;
    Assignmentid: string;
    Assignmentname: string;
    Assignmentdescription: string;
}

interface Quiz {
    Courseid: string;
    Coursename: string;
    Quizid: string;
    Quizname: string;
    Quizdescription: string;
}

interface Announcement {
    Courseid: string;
    Coursename: string;
    Announcementid: string;
    Announcementname: string;
    Announcementdescription: string;
}

interface Grade {
    Studentid: string;
    Courseid: string;
    Coursename: string;
    EnrollmentGrades: string;
    EnrollmentSemester: string;
}

interface Content {
    Courseid: string;
    Coursename: string;
    Coursedescription: string;
    Coursesemester: string;
}

function Course() {
    const [courseid1, setCourseid1] = React.useState("");
    const [coursename, setCoursename] = React.useState("");
    const [coursedescription, setCoursedescription] = React.useState("");

    const { courseid } = useParams();

    const [assignments, setAssignments] = React.useState<Assignment[]>([]);
    const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
    const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);
    const [grades, setGrades] = React.useState<Grade[]>([]);
    const [contents, setContents] = React.useState<Content[]>([]);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/student/view_contents", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const contents = response.data.filter((content: Content) => content.Courseid == courseid);
                setCourseid1(contents[0].Courseid);
                setCoursename(contents[0].Coursename);
                setCoursedescription(contents[0].Coursedescription);
            }
        } catch (error) {
            console.error("Error fetching contents:", error);
            throw error;
        }
    };

    const fetchAssignments = async () => {
        try {
            const token = localStorage.getItem("token");
            const currentSemester = "SPRING24";
            const response = await axios.get("http://127.0.0.1:8000/student/view_assignment_published", {
                params: {
                    current_semester: currentSemester,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const assignments = response.data.filter((assignment: Assignment) => assignment.Courseid == courseid);
                setAssignments(assignments);
            }
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const token = localStorage.getItem("token");
            const currentSemester = "SPRING24";
            const response = await axios.get("http://127.0.0.1:8000/student/view_quizzes_published", {
                params: {
                    current_semester: currentSemester,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const quizzes = response.data.filter((quiz: Quiz) => quiz.Courseid == courseid);
                setQuizzes(quizzes);
            }
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const token = localStorage.getItem("token");
            const currentSemester = "SPRING24";
            const response = await axios.get("http://127.0.0.1:8000/student/view_announcements_published", {
                params: {
                    current_semester: currentSemester,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const announcements = response.data.filter((announcement: Announcement) => announcement.Courseid == courseid);
                setAnnouncements(announcements);
            }
        } catch (error) {
            console.error("Error fetching Announcements:", error);
        }
    };

    const fetchGrades = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/student/view_grades", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const filteredGrades = response.data.filter((grade: Grade) => grade.Courseid == courseid);
                setGrades(filteredGrades);
            }
        } catch (error) {
            console.error("Error fetching grades:", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
        fetchQuizzes();
        fetchAnnouncements();
        fetchGrades();
    }, [courseid]);

    return (
        <>
            <Helmet>
                <title>Test</title>
            </Helmet>
            <div className="wrapper">
                <div
                    className="overlay"
                    onClick={(e) => document.body.classList.toggle("sidebar-open")}
                ></div>
                <Header></Header>
                <div className="main-background"></div>
                <div className="course-container">
                    <main className="course-content">
                        <div className="sidebar course-sidebar">
                            <Sidebar></Sidebar>
                        </div>
                        <div className="main-content" style={{ display: "flex" }}>
                            <div style={{ width: "100%", paddingLeft: "10px" }}>
                                <div className="main-title">
                                    <h5>Course</h5>
                                    <h6>Go-Canvas</h6>
                                </div>

                                <div className="course-content-section">
                                    <DashboardCard
                                        courseid={courseid1}
                                        coursename={coursename}
                                        coursedescription={coursedescription}
                                        coursesemester={"SPRING24"}
                                        buttondisabled={true}
                                    />

                                    {/* Announcements */}
                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                Announcements
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Announcement Name</th>
                                                                <th>Announcement Description</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {announcements.map((announcement) => (
                                                                <tr key={announcement["Announcementid"]}>
                                                                    <td>{announcement["Announcementname"]}</td>
                                                                    <td>{announcement["Announcementdescription"]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>

                                    {/* Quizzes */}
                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                Quizzes
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Quiz Name</th>
                                                                <th>Quiz Description</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {quizzes.map((quiz) => (
                                                                <tr key={quiz["Quizid"]}>
                                                                    <td>{quiz["Quizname"]}</td>
                                                                    <td>{quiz["Quizdescription"]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>

                                    {/* Assignments */}
                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                Assignments
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Assignment Name</th>
                                                                <th>Assignment Description</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {assignments.map((assignment) => (
                                                                <tr key={assignment["Assignmentid"]}>
                                                                    <td>{assignment["Assignmentname"]}</td>
                                                                    <td>{assignment["Assignmentdescription"]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>

                                    {/* Grades */}
                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                Grades
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Course</th>
                                                                <th>Grades</th>
                                                                <th>Semester</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {grades.map((grade, index) => (
                                                                <tr key={index}>
                                                                    <td>{grade["Coursename"]}</td>
                                                                    <td>{grade["EnrollmentGrades"]}</td>
                                                                    <td>{grade["EnrollmentSemester"]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Course;
