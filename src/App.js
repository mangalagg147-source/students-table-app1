import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import Loader from "./components/Loader";
import studentsData from "./data/students.json";
import { exportToExcel } from "./utils/excelExport";

function App() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1500);
  }, []);

  const addStudent = (student) => {
    student.id = Date.now();
    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {

    if (window.confirm("Are you sure?")) {
      setStudents(students.filter((s) => s.id !== id));
    }

  };

  const editStudent = (student) => {
    setSelectedStudent(student);
  };

  const updateStudent = (updatedStudent) => {

    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );

    setSelectedStudent(null);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Students Management</h1>

      <StudentForm
        addStudent={addStudent}
        editStudent={updateStudent}
        selectedStudent={selectedStudent}
      />

      <br />

      <button onClick={() => exportToExcel(students)}>
        Download Excel
      </button>

      {loading ? (
        <Loader />
      ) : (
        <StudentTable
          students={students}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
        />
      )}

    </div>
  );
}

export default App;