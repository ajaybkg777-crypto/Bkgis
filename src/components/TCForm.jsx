// src/components/TCForm.jsx
import React, { useState } from "react";
import api from "../api";
import "../styles/TCForm.css";
import "../styles/Academics.css";

export default function TCForm() {
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setMessage({ type: "", text: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.get("/public/tc", {
        params: {
          studentName: form.studentName,
          fatherName: form.fatherName,
          dateOfBirth: form.dateOfBirth,
        },
      });

      if (!data?.pdfUrl) {
        setMessage({
          type: "error",
          text: "TC record not found. Please check details.",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "TC found. Opening PDF...",
      });
      window.open(data.pdfUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Unable to fetch TC right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="academics-section">
      <h2 className="academics-title">Transfer Certificate (TC)</h2>

      <p className="academics-subtitle">
        Enter student details to view and download Transfer Certificate.
      </p>

      <form className="tc-form" onSubmit={handleSubmit}>
        {message.text ? (
          <div className={`message ${message.type}`}>{message.text}</div>
        ) : null}
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
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Open TC PDF"}
        </button>
      </form>
    </section>
  );
}
