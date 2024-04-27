import { Grid, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import DashboardCard from "../../components/dashboardcard";
import { selectDropdown } from "../../assets/images";
import AdminSidebar from "../../components/adminsidebar";



function AdminDashboardPage() {
  const [number, setNumber] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setNumber(event.target.value as string);
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
        <main className="dashnoard-content">
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
                <Grid item sm={12} md={4} lg={4} className="courses-grid">
                  <DashboardCard></DashboardCard>
                </Grid>
                <Grid item sm={12} md={4} lg={4} className="courses-grid">
                  <DashboardCard></DashboardCard>
                </Grid>
                <Grid item sm={12} md={4} lg={4} className="courses-grid">
                  <DashboardCard></DashboardCard>
                </Grid>
                <Grid item sm={12} md={4} lg={4} className="courses-grid">
                  <DashboardCard></DashboardCard>
                </Grid>
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
