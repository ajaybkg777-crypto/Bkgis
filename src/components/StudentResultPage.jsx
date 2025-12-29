import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMedal, FaArrowLeft } from "react-icons/fa";
import "../styles/StudentResultPage.css";

export default function StudentResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;

  if (!result) {
    return (
      <div className="result-error">
        <h2>⚠ Result Not Found</h2>
        <p>Please search again from the result page.</p>
        <button onClick={() => navigate("/results")}>Go Back</button>
      </div>
    );
  }

  const {
    name,
    roll,
    class: studentClass,
    exam,
    totalObtained,
    totalMax,
    percentage,
    grade,
    subjectMarks = [],
  } = result;

  return (
    <div className="result-page">
      <header className="result-header">
        <h1>BKG International School</h1>
        <p className="subtitle">Student Result</p>
      </header>

      <div className="result-card">
        {/* Student Info */}
        <div className="student-info">
          <h2>{name}</h2>

          <div className="info-grid">
            <div><span>Roll No</span><b>{roll}</b></div>
            <div><span>Class</span><b>{studentClass}</b></div>
            <div><span>Exam</span><b>{exam}</b></div>
          </div>
        </div>

        {/* Summary */}
        <div className="summary-box">
          <div className="summary-item">
            <FaMedal />
            <span>Total Marks</span>
            <strong>{totalObtained} / {totalMax}</strong>
          </div>

          <div className="summary-item">
            <span>Percentage</span>
            <strong>{percentage}%</strong>
          </div>

          <div className="summary-item highlight">
            <span>Grade</span>
            <strong>{grade}</strong>
          </div>
        </div>

        {/* Marks Table */}
        <div className="marks-section">
          <h3>Subject-wise Marks</h3>

          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Out of</th>
              </tr>
            </thead>
            <tbody>
              {subjectMarks.length > 0 ? (
                subjectMarks.map((s, i) => (
                  <tr key={i}>
                    <td>{s.subject}</td>
                    <td>{s.marks}</td>
                    <td>{s.max}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No subject data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="result-actions">
          <button onClick={() => window.print()} className="btn-print">
            Print Result
          </button>

          <button onClick={() => navigate("/results")} className="btn-back">
            <FaArrowLeft /> Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}
