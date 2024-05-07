import {Grid} from "@mui/material";
import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import DashboardCardAdmin from "../../components/admindashboardcard";
import AdminSidebar from "../../components/adminsidebar";
import axios from "axios";


function AdminDashboardPage() {

    const token = localStorage.getItem("token");
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/admin/view_courses_by_faculty", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const courses = response.data.map((course: {
                    Coursename: any;
                    Facultyfirstname: any;
                    Facultylastname: any;
                    Coursesemester: any;
                }) => {
                    const {Coursename, Facultyfirstname, Facultylastname, Coursesemester} = course;
                    const facultyName = `${Facultyfirstname} ${Facultylastname}`;
                    return {
                        Coursename,
                        Faculty: facultyName,
                        Coursesemester
                    };
                });

                setCourses(courses);
                console.log(courses);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };


    return (
        <>
            <Helmet>
                <title>Admin-Dashboard</title>
            </Helmet>
            {/* AdminDashboardPage-Start */}
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
                <div className="main-background"></div>
                <main className="dashboard-content">
                    <div className="sidebar">
                        <AdminSidebar></AdminSidebar>
                    </div>
                    <div className="main-content">
                        <div className="main-title">
                            <h5>Admin-Dashboard</h5>
                            <h6>Go-Canvas</h6>
                        </div>
                        <Grid container spacing={3} className="grid-sections">
                            <Grid
                                item
                                md={12}
                                lg={12}
                                spacing={3}
                                container
                                className="grid-section-1"
                            >
                                {courses.map((course, index) => (
                                    <Grid item sm={12} md={4} lg={4} className="courses-grid" key={index}>
                                        <DashboardCardAdmin coursename={course["Coursename"]}
                                                            coursesemester={course["Coursesemester"]}
                                                            facultyname={course["Faculty"]}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </div>
                </main>
            </div>
            {/* AdminDashboardPage-End */}
        </>
    );
}

export default AdminDashboardPage;
