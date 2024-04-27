import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import DashboardCard from "../../components/dashboardcardstudent";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import {useParams} from "react-router-dom";
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
    Studentid: string
    Courseid: string;
    Coursename: string;
    EnrollmentGrades: string;
    EnrollmentSemester: string;
}

function Course() {

    const [courseid, setCourseid] = React.useState("");
    const [coursename, setCoursename] = React.useState("");
    const [coursedescription, setCoursedescription] = React.useState("");
    const token = localStorage.getItem("token");

    const [assignments, setAssignments] = React.useState([]);
    const [quizzes, setQuizzes] = React.useState([]);
    const [announcements, setAnnouncements] = React.useState([]);
    const [grades, setGrades] = React.useState([]);
    const [contents, setContents] = React.useState([]);


    useEffect(() => {
        // Parse the query string from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        setCourseid(urlParams.get('courseid') ?? '');
        setCoursename(urlParams.get('coursename') ?? '');
        setCoursedescription(urlParams.get('coursedescription') ?? '');

        // fetchAssignments();
        // fetchQuizzes();
        // fetchAnnouncements();
        // fetchGrades();

    }, []);


    const fetchContents = async () => {

    }

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
                console.log(filteredGrades);
            }
        } catch (error) {
            console.error("Error fetching grades:", error);
        }
    };

    // useEffect(() => {
    //     fetchAssignments();
    //     fetchQuizzes();
    //     fetchAnnouncements();
    //     fetchGrades();
    // }, []);

    const handleDropdownToggle = () => {
        // Call fetchAssignments when the dropdown toggle is clicked
        fetchAssignments();
    };

    const handleQuizzesDropdownToggle = () => {
        // Call fetchQuizzes when the dropdown toggle for quizzes is clicked
        fetchQuizzes();
    };

    const handleAnnouncementsDropdownToggle = () => {
        // Call fetchAnnouncements when the dropdown toggle for announcements is clicked
        fetchAnnouncements();
    };

    const handleGradesDropdownToggle = () => {
        // Call fetchAnnouncements when the dropdown toggle for announcements is clicked
        fetchGrades();
    };

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
                        <div className="main-content" style={{display: "flex"}}>
                            {/* <div className="sidebar-course">
                <CourseSidebar></CourseSidebar>
              </div> */}
                            <div style={{width: "100%", paddingLeft: "10px"}}>
                                <div className="main-title">
                                    <h5>Course</h5>
                                    <h6>Go-Canvas</h6>
                                </div>

                                <div className="course-content-section">
                                    <DashboardCard
                                        courseid={courseid}
                                        coursename={coursename}
                                        coursedescription={coursedescription}
                                        coursesemester={"SPRING24"}
                                        buttondisabled={true}
                                    />

                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                onClick={handleGradesDropdownToggle} // Call fetchGrades when the toggle is clicked
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

                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                onClick={handleDropdownToggle} // Call fetchAssignments when the toggle is clicked
                                            >
                                                Assignments
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                        <tr>
                                                            <th>Assignment ID</th>
                                                            <th>Assignment Name</th>
                                                            <th>Assignment Description</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {assignments.map((assignment) => (
                                                            <tr key={assignment["Assignmentid"]}>
                                                                <td>{assignment["Assignmentid"]}</td>
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


                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                onClick={handleAnnouncementsDropdownToggle} // Call fetchAnnouncements when the toggle is clicked
                                            >
                                                Announcements
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                        <tr>
                                                            <th>Announcement ID</th>
                                                            <th>Announcement Name</th>
                                                            <th>Announcement Description</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {announcements.map((announcement) => (
                                                            <tr key={announcement["Announcementid"]}>
                                                                <td>{announcement["Announcementid"]}</td>
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


                                    <div className="content-dropdown">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                onClick={handleQuizzesDropdownToggle} // Call fetchQuizzes when the toggle is clicked
                                            >
                                                Quizzes
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <table>
                                                        <thead>
                                                        <tr>
                                                            <th>Quiz ID</th>
                                                            <th>Quiz Name</th>
                                                            <th>Quiz Description</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {quizzes.map((quiz) => (
                                                            <tr key={quiz["Quizid"]}>
                                                                <td>{quiz["Quizid"]}</td>
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
