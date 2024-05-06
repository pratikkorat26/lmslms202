import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { johnsmithside } from "../../assets/images";

function AccountPage() {
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [userid, setUserId] = React.useState("");
  const [textState, setTextState] = React.useState("Off");

  const toggleText = () => {
    setTextState((state) => (state === "On" ? "Off" : "On"));
  };

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
        setUserId(data.Studentid);
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
        Studentnotification: profileData.Studentnotification,
        Studentcontactnumber: profileData.Studentcontactnumber
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
        <main className="dashnoard-content">
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
                <div className="profile">
                  <div className="profile-img">
                    <img src={johnsmithside} alt="john-smith" />
                  </div>
                  <h6>{firstname}  {lastname}</h6>
                </div>
                <div style={{ right: "10px", position: "absolute" }}>
                  <Button variant="contained" onClick={toggleText}>{textState == 'Off' ? 'Edit' : 'Cancel'}</Button>
                </div>
                {textState == 'On' ? (
                  <div>
                    <TextField
                      id="standard-basic"
                      label="First Name"
                      variant="standard"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                      id="standard-basic"
                      label="Last Name"
                      variant="standard"
                      value={lastname}
                      onChange={e => setLastName(e.target.value)}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {firstname} <br />
                    {lastname}
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
