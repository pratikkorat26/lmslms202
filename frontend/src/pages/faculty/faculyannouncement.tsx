import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

// Define the type for savedAnnouncements
interface AnnouncementData {
  id: number;
  announcementName: string;
  announcementDescription: string;
  Semester: string;
}

function AddAnnouncement() {
  const { courseid } = useParams();
  
  // Providing a default value for courseid if it's undefined
  const courseId = courseid || ""; 

  const [showForm, setShowForm] = useState(false);
  const [announcementName, setAnnouncementName] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [savedAnnouncements, setSavedAnnouncements] = useState<AnnouncementData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/faculty/view_announcement_by_courseid?courseid=${courseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.map((item: { Announcementid: any; Announcementname: any; Announcementdescription: any; }) => ({
            id: item.Announcementid,
            announcementName: item.Announcementname,
            announcementDescription: item.Announcementdescription,
            Semester: "SPRING24",
          }));
          setSavedAnnouncements(mappedData);
        } else {
          setError("Failed to fetch announcements");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to fetch announcements");
      }
    };
  
    fetchAnnouncements();
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/faculty/add_announcements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Courseid: courseId,
            Announcementname: announcementName,
            Announcementdescription: announcementDescription,
            Semester: "SPRING24",
          }),
        }
      );
      if (response.ok) {
        const newAnnouncement = await response.json();
        setSavedAnnouncements(prevAnnouncements => [...prevAnnouncements, newAnnouncement]);
        setAnnouncementName("");
        setAnnouncementDescription("");
        setShowForm(false);
        setError("");
        // Show success alert and refresh the page on OK
        alert("Your Announcement Added Successfully");
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to add announcement");
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
      setError("Failed to add announcement");
    }
  };

  const handleAddAnnouncementClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!announcementName.trim() || !announcementDescription.trim()) {
      setError("Please fill out all fields.");
      return;
    }
  
    handleSubmit();
  };

  const handleCancel = () => {
    setAnnouncementName("");
    setAnnouncementDescription("");
    setShowForm(false);
    setError("");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard-Faculty</title>
      </Helmet>
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
            <div style={{ marginTop: "30px" }}>
              {!showForm ? (
                <Button
                  onClick={handleAddAnnouncementClick}
                  variant="contained"
                  color="primary"
                  style={{ display: "block", marginLeft: "auto" }}
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
              <Accordion defaultExpanded style={{ marginTop: "20px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Announcements</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {savedAnnouncements.map((announcement, index) => (
                      <div key={index} style={{borderBottom:'1px solid grey'}}>
                        <h3>
                          Announcement {index + 1}:{" "}
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
