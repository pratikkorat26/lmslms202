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

function AddAssignment() {
  interface AssignmentData {
    id: number;
    assignmentName: string;
    assignmentDescription: string;
  }

  const [showForm, setShowForm] = useState(false); // State to manage visibility of the form
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [savedAssignments, setSavedAssignments] = useState<AssignmentData[]>(
    []
  ); // State to store saved assignments
  const [error, setError] = useState<string>(""); // State to manage error message

  const handleSubmit = (data: AssignmentData) => {
    // Handle form submission here
    console.log("Form submitted with data:", data);
    setSavedAssignments([...savedAssignments, data]); // Add new assignment data to savedAssignments state
    setAssignmentName("");
    setAssignmentDescription("");
    setShowForm(false); // Hide the form after submission
    setError("");
  };

  const handleAddAssignmentClick = () => {
    setShowForm(true); // Show the form when the "Add Assignment" button is clicked
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if fields are empty
    if (!assignmentName.trim() || !assignmentDescription.trim()) {
      setError("Please fill out all fields."); // Set error message
      return; // Exit early if fields are empty
    }

    // Pass assignment details to parent component for submission
    handleSubmit({
      id: savedAssignments.length + 1,
      assignmentName,
      assignmentDescription,
    });
  };

  const handleCancel = () => {
    setAssignmentName("");
    setAssignmentDescription("");
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
          onClick={(e) => document.body.classList.toggle("sidebar-open")}
        ></div>
        <Header></Header>
        <div className="main-background"></div>
        <main className="dashnoard-content">
          <div className="sidebar">
            <FacultySidebar></FacultySidebar>
          </div>
          <div className="main-content">
            <div className="main-title">
              <h5>Assignments</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div style={{marginTop:'30px'}}>
              {!showForm ? (
                <Button
                  onClick={handleAddAssignmentClick}
                  variant="contained"
                  color="primary"
                  style={{display:'block', marginLeft:'auto'}}
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
                  <Typography>Assignments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {savedAssignments.map((assignment) => (
                      <div key={assignment.id}>
                        <h3>
                          Assignment {assignment.id}:{" "}
                          {assignment.assignmentName}
                        </h3>
                        <p>
                          <strong>Description:</strong>{" "}
                          {assignment.assignmentDescription}
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