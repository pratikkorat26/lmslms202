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

function AddSyllabus() {

  const { courseid } = useParams();
  
  // Providing a default value for courseid if it's undefined
  const courseId = courseid || ""; 
  
  const [showForm, setShowForm] = useState(false);
  const [syllabusName, setSyllabusName] = useState("");
  const [syllabusDescription, setSyllabusDescription] = useState("");
  const [savedSyllabus, setSavedSyllabus] = useState<{ Courseid: number, Coursesemester: string, Coursedescription: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/faculty/view_content_by_courseid?courseid=2", // Assuming courseid is hardcoded for now
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
          setSavedSyllabus(data);
        } else {
          setError("Failed to fetch syllabus");
        }
      } catch (error) {
        console.error("Error fetching syllabus:", error);
        setError("Failed to fetch syllabus");
      }
    };

    fetchSyllabus();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/faculty/update-syllabus/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Courseid: courseId, // Assuming courseid is hardcoded for now
            Coursesemester: "SPRING24", // Assuming semester is hardcoded for now
            Coursedescription: syllabusDescription,
          }),
        }
      );
      if (response.ok) {
        const newSyllabus = await response.json();
        setSavedSyllabus([...savedSyllabus, newSyllabus]);
        setSyllabusName("");
        setSyllabusDescription("");
        setShowForm(false);
        setError("");
        alert("Syllabus added successfully");
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to add syllabus");
      }
    } catch (error) {
      console.error("Error adding syllabus:", error);
      setError("Failed to add syllabus");
    }
  };

  const handleAddSyllabusClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

    if (!syllabusName.trim() || !syllabusDescription.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    handleSubmit();
  };

  const handleCancel = () => {
    setSyllabusName("");
    setSyllabusDescription("");
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
        <main className="dashboard-content">
          <div className="sidebar">
            <FacultySidebar></FacultySidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Syllabus</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div style={{ marginTop: "30px" }}>
              {!showForm ? (
                <Button
                  onClick={handleAddSyllabusClick}
                  variant="contained"
                  color="primary"
                  style={{ display: "block", marginLeft: "auto" }}
                >
                  Update Syllabus
                </Button>
              ) : (
                <>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <form onSubmit={handleFormSubmit}>
                    <TextField
                      label="Title"
                      variant="outlined"
                      value={syllabusName}
                      onChange={(e) => setSyllabusName(e.target.value)}
                      fullWidth
                      margin="normal"
                      placeholder="Enter Title"
                    />
                    <TextField
                      label="Content Description"
                      variant="outlined"
                      value={syllabusDescription}
                      onChange={(e) => setSyllabusDescription(e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      placeholder="Enter Content Description"
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="contained"
                      color="error"
                      style={{ marginLeft: "20px" }}
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
                  <Typography>Syllabus</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {savedSyllabus.map((syllabus, index) => (
                      <div key={index} style={{ borderBottom: "1px solid grey" }}>
                        <h3>
                          Syllabus {index + 1}: {syllabus.Coursesemester}
                        </h3>
                        <p>
                          <strong>Description:</strong> {syllabus.Coursedescription}
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

export default AddSyllabus;
