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

function AddSyllabus() {
  interface SyllabusData {
    id: number;
    syllabusName: string;
    syllabusDescription: string;
  }

  const [showForm, setShowForm] = useState(false);
  const [syllabusName, setSyllabusName] = useState("");
  const [syllabusDescription, setSyllabusDescription] = useState("");
  const [savedSyllabus, setSavedSyllabus] = useState<SyllabusData[]>([]);
  const [error, setError] = useState<string>("");

  const handleSubmit = (data: SyllabusData) => {
    console.log("Form submitted with data:", data);
    setSavedSyllabus([...savedSyllabus, data]);
    setSyllabusName("");
    setSyllabusDescription("");
    setShowForm(false);
    setError("");
  };

  const handleAddSyllabusClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!syllabusName.trim() || !syllabusDescription.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    handleSubmit({
      id: savedSyllabus.length + 1,
      syllabusName,
      syllabusDescription,
    });
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
                  Add Syllabus
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
                      placeholder="Enter Description"
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
                    {savedSyllabus.map((syllabus) => (
                      <div key={syllabus.id}>
                        <h3>
                          Syllabus {syllabus.id}: {syllabus.syllabusName}
                        </h3>
                        <p>
                          <strong>Description:</strong>{" "}
                          {syllabus.syllabusDescription}
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
