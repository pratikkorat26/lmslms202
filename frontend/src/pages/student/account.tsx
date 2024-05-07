import { Button, Switch, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { johnsmithside } from "../../assets/images";

function AccountPage() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [textState, setTextState] = useState("Off");
  const [studentNotification, setStudentNotification] = useState(false);
  const [editMode, setEditMode] = useState(false); // State to track edit mode

  useEffect(() => {
    const fetchProfileData = async () => {
      await fetchProfile();
    };

    fetchProfileData();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://127.0.0.1:8000/student/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        setFirstName(data.Studentfirstname);
        setLastName(data.Studentlastname);
        setContactNumber(data.Studentcontactnumber);
        setStudentNotification(data.Studentnotification);
        localStorage.setItem("profile", JSON.stringify(data));
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const profileData = JSON.parse(localStorage.getItem("profile") || "{}");

      const response = await axios.put("http://127.0.0.1:8000/student/update_profile", {
        Studentfirstname: firstname,
        Studentlastname: lastname,
        Studentcontactnumber: contactNumber,
        Studentnotification: studentNotification,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log("Profile updated successfully");
        toggleText();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleText = () => {
    setTextState((state) => (state === "On" ? "Off" : "On"));
    setEditMode((prevState) => !prevState); // Toggle edit mode
  };

  return (
    <>
      <Helmet>
        <title>Profile | Go-Canvas</title>
      </Helmet>
      <div className="wrapper">
        <div className="overlay" onClick={(e) => document.body.classList.toggle("sidebar-open")}></div>
        <div className="search-overlay" onClick={(e) => document.body.classList.toggle("search-open")}></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="dashboard-content">
          <div className="sidebar">
            <Sidebar></Sidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Profile</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div className="innerpage-table table">
              <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent:'end' }}>
                  {/* Render Switch only in edit mode */}
                  {editMode && (
                    <Tooltip title={studentNotification ? "Disable Notification" : "Enable Notification"}>
                      <Switch
                        checked={studentNotification}
                        onChange={() => setStudentNotification(prevState => !prevState)}
                      />
                    </Tooltip>
                  )}
                  <Button variant="contained" onClick={toggleText} style={{ marginLeft: "10px" }}>
                    {textState === 'Off' ? 'Edit' : 'Cancel'}
                  </Button>
                </div>
                <div className="profile">
                  <div className="profile-img">
                    <img src={johnsmithside} alt="john-smith" />
                  </div>
                  <h6>{firstname}  {lastname}</h6>
                </div>
                
                {textState === 'On' ? (
                  <div>
                    <div>
                      <Typography variant="body1">First Name:</Typography>
                      <TextField
                        variant="standard"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Typography variant="body1">Last Name:</Typography>
                      <TextField
                        variant="standard"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Typography variant="body1">Contact No.:</Typography>
                      <TextField
                        variant="standard"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <Typography variant="body1">First Name:</Typography>
                      <span>{firstname}</span>
                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <Typography variant="body1">Last Name:</Typography>
                      <span>{lastname}</span>
                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <Typography variant="body1">Contact No:</Typography>
                      <span>{contactNumber}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AccountPage;
