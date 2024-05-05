import React, {useState} from "react";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import AdminSidebar from "../../components/adminsidebar";
import axios from "axios";

function AssignCourse() {

    const [facultyList, setFacultyList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const token = localStorage.getItem("token");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    // useEffect(() => {
    //     fetchFaculties();
    //     fetchCourses();
    // }, []);

    const fetchFaculties = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/admin/view_faculties", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                setFacultyList(response.data);
                console.log("Faculties fetched successfully:", response.data);
            } else {
                console.error("Error fetching faculties:", response.data);
            }
        } catch (error) {
            console.error("Error fetching faculties:", error);
        }

    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/admin/view_courses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                setCourseList(response.data);
                console.log("Courses fetched successfully:", response.data);
            } else {
                console.error("Error fetching courses:", response.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    return (<>
        <Helmet>
            <title>Admin-Courses</title>
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
                        <h5>Assign-Course</h5>
                        <h6>Go-Canvas</h6>

                    </div>
                    <div>
                        <label htmlFor="selectBox">Select an option:</label>
                        <select id="selectBox" value={"Hello"}>
                            <option value="">-- Select --</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <p>Selected value: {"Hello"}</p>
                    </div>
                </div>

            </main>
        </div>
    </>)
}

export default AssignCourse;
