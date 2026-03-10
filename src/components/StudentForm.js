import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, selectedStudent }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.email || !student.age) {
      alert("All fields are required");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(student.email)) {
      alert("Invalid email");
      return;
    }

    if (selectedStudent) {
      editStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({
      name: "",
      email: "",
      age: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add / Edit Student</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />

      <button type="submit">Save Student</button>
    </form>
  );
}

export default StudentForm;