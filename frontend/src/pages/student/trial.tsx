import React, { useState } from 'react';

function CourseForm() {
  const [courseData, setCourseData] = useState({
    courseId: '',
    courseName: '',
    courseDescription: '',
    courseSemester: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Convert the courseData object to JSON format
    const jsonData = JSON.stringify(courseData);
    console.log(jsonData); // You can do whatever you want with this JSON data
    // You might want to send this JSON data to a server or store it locally
  };

  return (
    <div>
      <h2>Enter Course Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course ID:
          <input type="text" name="courseId" value={courseData.courseId} onChange={handleChange} />
        </label>
        <br />
        <label>
          Course Name:
          <input type="text" name="courseName" value={courseData.courseName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Course Description:
          <textarea name="courseDescription" value={courseData.courseDescription} onChange={handleChange} />
        </label>
        <br />
        <label>
          Course Semester:
          <input type="text" name="courseSemester" value={courseData.courseSemester} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CourseForm;
