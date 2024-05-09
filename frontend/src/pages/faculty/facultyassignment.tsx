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

interface AssignmentData {
  id: number;
  Assignmentname: string;
  Assignmentdescription: string;
}

function AddAssignment() {
  const token = localStorage.getItem("token");
  const { courseid } = useParams();
  
  // Providing a default value for courseid if it's undefined
  const courseId = courseid || ""; 

  const [showForm, setShowForm] = useState(false);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [savedAssignments, setSavedAssignments] = useState<AssignmentData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/faculty/view_assignment_by_courseid?courseid=${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
          },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSavedAssignments(data); // Assuming data is an array of assignments
        } else {
          setError("Failed to fetch assignments");
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setError("Failed to fetch assignments");
      }
    };

    fetchAssignments();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/faculty/add_assignment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Courseid: courseId,
            Assignmentname: assignmentName,
            Assignmentdescription: assignmentDescription,
            Semester: "SPRING24", // You may adjust this value based on your requirements
          }),
        }
      );
      if (response.ok) {
        const newAssignment = await response.json();
        setSavedAssignments([...savedAssignments, newAssignment]);
        setAssignmentName("");
        setAssignmentDescription("");
        setShowForm(false);
        setError("");
        // Show success alert and refresh the page on OK
        alert("Assignment added successfully");
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to add assignment");
      }
    } catch (error) {
      console.error("Error adding assignment:", error);
      setError("Failed to add assignment");
    }
  };
  

  const handleAddAssignmentClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assignmentName.trim() || !assignmentDescription.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    handleSubmit();
  };

  const handleCancel = () => {
    setAssignmentName("");
    setAssignmentDescription("");
    setShowForm(false);
    setError("");
  };

  return (
    <>
      <Helmet>
        <title>Assignment</title>
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
              <h5>Assignments</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div style={{ marginTop: "30px" }}>
              {!showForm ? (
                <Button
                  onClick={handleAddAssignmentClick}
                  variant="contained"
                  color="primary"
                  style={{ display: "block", marginLeft: "auto" }}
                >
                  Add Assignment
                </Button>
              ) : (
                <>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <form onSubmit={handleFormSubmit}>
                    <TextField
                      label="Assignment Name"
                      variant="outlined"
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                      fullWidth
                      margin="normal"
                      placeholder="Enter Assignment Name"
                    />
                    <TextField
                      label="Assignment Description"
                      variant="outlined"
                      value={assignmentDescription}
                      onChange={(e) => setAssignmentDescription(e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      placeholder="Enter Assignment Description"
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
                  <Typography>Assignments</Typography>
                </AccordionSummary>
                <AccordionDetails>
  <div>
    {savedAssignments.map((assignment, index) => (
      <div key={index} style={{ borderBottom: "1px solid grey" }}>
        <h3>
          Assignment {index + 1}: {assignment.Assignmentname}
        </h3>
        <p>
          <strong>Description:</strong> {assignment.Assignmentdescription}
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

export default AddAssignment;
