import React, { useState } from "react";
import FacultySidebar from "../../components/facultysidebar";
import Header from "../../components/header";
import { Helmet } from "react-helmet";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AddAnnouncement() {
  interface AnnouncementData {
    id: number;
    announcementName: string;
    announcementDescription: string;
  }

  const [showForm, setShowForm] = useState(false); // State to manage visibility of the form
  const [announcementName, setAnnouncementName] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [savedAnnouncements, setSavedAnnouncements] = useState<AnnouncementData[]>(
    []
  ); // State to store saved announcements
  const [error, setError] = useState<string>(""); // State to manage error message

  const handleSubmit = (data: AnnouncementData) => {
    // Handle form submission here
    console.log("Form submitted with data:", data);
    setSavedAnnouncements([...savedAnnouncements, data]); // Add new announcement data to savedAnnouncements state
    setAnnouncementName("");
    setAnnouncementDescription("");
    setShowForm(false); // Hide the form after submission
    setError("");
  };

  const handleAddAnnouncementClick = () => {
    setShowForm(true); // Show the form when the "Add Announcement" button is clicked
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if fields are empty
    if (!announcementName.trim() || !announcementDescription.trim()) {
      setError("Please fill out all fields."); // Set error message
      return; // Exit early if fields are empty
    }

    // Pass announcement details to parent component for submission
    handleSubmit({
      id: savedAnnouncements.length + 1,
      announcementName,
      announcementDescription,
    });
  };

  const handleCancel = () => {
    setAnnouncementName("");
    setAnnouncementDescription("");
    setShowForm(false); // Hide the form when the "Cancel" button is clicked
    setError("");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard-Faculty</title>
      </Helmet>
      {/* Dashboardpage-Start */}
      <div className="wrapper">
        <div
          className="overlay"
          onClick={() => document.body.classList.toggle("sidebar-open")}
        ></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="dashnoard-content">
          <div className="sidebar">
            <FacultySidebar></FacultySidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Announcements</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div style={{marginTop:'30px'}}>
              {!showForm ? (
                <Button
                  onClick={handleAddAnnouncementClick}
                  variant="contained"
                  color="primary"
                  style={{display:'block', marginLeft:'auto'}}
                >
                  Add Announcement
                </Button>
              ) : (
                <>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <form onSubmit={handleFormSubmit}>
                    <TextField
                      label="Announcement Name"
                      variant="outlined"
                      value={announcementName}
                      onChange={(e) => setAnnouncementName(e.target.value)}
                      fullWidth
                      margin="normal"
                      placeholder="Enter Announcement Name"
                    />
                    <TextField
                      label="Announcement Description"
                      variant="outlined"
                      value={announcementDescription}
                      onChange={(e) => setAnnouncementDescription(e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      placeholder="Enter Announcement Description"
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="contained"
                      color="error"
                      style={{marginLeft:'20px'}}
                    >
                      Cancel
                    </Button>
                  </form>
                </>
              )}
              <Accordion defaultExpanded style={{marginTop:'20px'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Announcements</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {savedAnnouncements.map((announcement) => (
                      <div key={announcement.id}>
                        <h3>
                          Announcement {announcement.id}:{" "}
                          {announcement.announcementName}
                        </h3>
                        <p>
                          <strong>Description:</strong>{" "}
                          {announcement.announcementDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddAnnouncement;