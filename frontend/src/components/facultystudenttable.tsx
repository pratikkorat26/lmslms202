import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Student {
  Coursename: string
  Coursesemester : string
  Studentcontactnumber : string
  Studentid : string
  Studentname : string
  Coursegrade : string
}

interface Row {
  studentfirstname: string;
  studentcontactnumber: string;
  coursesemester: string;
  coursegrade : string
}

function createRow(student: Student): Row {
  const { Studentname, Studentcontactnumber, Coursesemester, Coursegrade } = student;
  return { studentfirstname: Studentname, studentcontactnumber: Studentcontactnumber, coursesemester: Coursesemester, coursegrade: Coursegrade };
}

const StudentTable: React.FC<{ students: Student[] }> = ({ students }) => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (students && Array.isArray(students)) {
      const mappedRows = students.map(createRow);
      setRows(mappedRows);
    }
  }, [students]);
  console.log(students);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Semester</TableCell>
            <TableCell align="right">Grades</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Row, index: number) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.studentfirstname}
              </TableCell>
              <TableCell align="right">{row.studentcontactnumber}</TableCell>
              <TableCell align="right">{row.coursesemester}</TableCell>
              <TableCell align="right">{row.coursegrade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
