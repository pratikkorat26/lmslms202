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

function AddQuiz() {
  interface QuizData {
    id: number;
    quizName: string;
    quizDescription: string;
  }

  const [showForm, setShowForm] = useState(false); // State to manage visibility of the form
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [savedQuizs, setSavedQuizs] = useState<QuizData[]>(
    []
  ); // State to store saved quizs
  const [error, setError] = useState<string>(""); // State to manage error message

  const handleSubmit = (data: QuizData) => {
    // Handle form submission here
    console.log("Form submitted with data:", data);
    setSavedQuizs([...savedQuizs, data]); // Add new quiz data to savedQuizs state
    setQuizName("");
    setQuizDescription("");
    setShowForm(false); // Hide the form after submission
    setError("");
  };

  const handleAddQuizClick = () => {
    setShowForm(true); // Show the form when the "Add Quiz" button is clicked
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if fields are empty
    if (!quizName.trim() || !quizDescription.trim()) {
      setError("Please fill out all fields."); // Set error message
      return; // Exit early if fields are empty
    }

    // Pass quiz details to parent component for submission
    handleSubmit({
      id: savedQuizs.length + 1,
      quizName,
      quizDescription,
    });
  };

  const handleCancel = () => {
    setQuizName("");
    setQuizDescription("");
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
              <h5>Quizs</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div style={{marginTop:'30px'}}>
              {!showForm ? (
                <Button
                  onClick={handleAddQuizClick}
                  variant="contained"
                  color="primary"
                  style={{display:'block', marginLeft:'auto'}}
                >
                  Add Quiz
                </Button>
              ) : (
                <>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <form onSubmit={handleFormSubmit}>
                    <TextField
                      label="Quiz Name"
                      variant="outlined"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      fullWidth
                      margin="normal"
                      placeholder="Enter Quiz Name"
                    />
                    <TextField
                      label="Quiz Description"
                      variant="outlined"
                      value={quizDescription}
                      onChange={(e) => setQuizDescription(e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      placeholder="Enter Quiz Description"
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
                  <Typography>Quizzes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {savedQuizs.map((quiz) => (
                      <div key={quiz.id}>
                        <h3>
                          Quiz {quiz.id}:{" "}
                          {quiz.quizName}
                        </h3>
                        <p>
                          <strong>Description:</strong>{" "}
                          {quiz.quizDescription}
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

export default AddQuiz;