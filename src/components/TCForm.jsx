// src/components/TCForm.jsx
import React, { useState } from "react";
import "../styles/TCForm.css";
import "../styles/Academics.css";

export default function TCForm() {
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("TC request submitted successfully!");
  };

  return (
    <section className="academics-section">
      <h2 className="academics-title">Transfer Certificate (TC)</h2>

      <p className="academics-subtitle">
        Please fill in the details below to request a Transfer Certificate.
      </p>

      <form className="tc-form" onSubmit={handleSubmit}>
        <input
          name="studentName"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          required
        />
        <input
          name="fatherName"
          placeholder="Father's Name"
          value={form.fatherName}
          onChange={handleChange}
          required
        />
        <input
          name="motherName"
          placeholder="Mother's Name"
          value={form.motherName}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit TC Request</button>
      </form>
    </section>
  );
}
