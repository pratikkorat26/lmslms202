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

interface QuizData {
  id: number;
  Quizname: string;
  Quizdescription: string;
  Semester: string;
}

function AddQuiz() {
  const { courseid } = useParams();
  
  // Providing a default value for courseid if it's undefined
  const courseId = courseid || ""; 

  const [showForm, setShowForm] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [savedQuizzes, setSavedQuizzes] = useState<QuizData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/faculty/view_quiz_by_courseid?courseid=${courseId}`, // Adjust courseid as needed
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
          setSavedQuizzes(data); // Assuming data is an array of quizzes
        } else {
          setError("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/faculty/add_quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Courseid: courseId,
            Quizname: quizName,
            Quizdescription: quizDescription,
            Semester: "SPRING24",
          }),
        }
      );
      if (response.ok) {
        const newQuiz = await response.json();
        setSavedQuizzes([...savedQuizzes, newQuiz]);
        setQuizName("");
        setQuizDescription("");
        setShowForm(false);
        setError("");
        // Show success alert and refresh the page on OK
        alert("Quiz added successfully");
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to add quiz");
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
      setError("Failed to add quiz");
    }
  };

  const handleAddQuizClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quizName.trim() || !quizDescription.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    handleSubmit();
  };

  const handleCancel = () => {
    setQuizName("");
    setQuizDescription("");
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
              <h5>Quizzes</h5>
              <h6>Go-Canvas</h6>
            </div>
            <div style={{ marginTop: "30px" }}>
              {!showForm ? (
                <Button
                  onClick={handleAddQuizClick}
                  variant="contained"
                  color="primary"
                  style={{ display: "block", marginLeft: "auto" }}
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
                  <Typography>Quizzes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {savedQuizzes.map((quiz, index) => (
                      <div key={index} style={{ borderBottom: "1px solid grey" }}>
                        <h3>
                          Quiz {index + 1}: {quiz.Quizname}
                        </h3>
                        <p>
                          <strong>Description:</strong> {quiz.Quizdescription}
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
