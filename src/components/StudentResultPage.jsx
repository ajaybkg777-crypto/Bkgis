import React from "react";
import { useLocation } from "react-router-dom";
import { FaMedal } from "react-icons/fa";
import "../styles/StudentResultPage.css";

export default function StudentResultPage() {
  const { state } = useLocation();
  const r = state?.result;

  if (!r) return <h2 className="not-found">No result data available.</h2>;

  return (
    <div className="result-scroll">
      <div className="result-desktop-wrapper">

        <div className="result-page">
          <h1 className="result-header">BKGIS Student Result</h1>

          <div className="result-card">
            <h2 className="student-name">{r.name}</h2>

            <div className="info-box">
              <div className="info-item">
                <label>Roll No</label>
                <span>{r.roll}</span>
              </div>

              <div className="info-item">
                <label>Class</label>
                <span>{r.class}</span>
              </div>

              <div className="info-item">
                <label>Exam</label>
                <span>{r.exam}</span>
              </div>
            </div>

            <div className="marks-summary">
              <p><FaMedal /> Total  :  <b>{r.totalObtained}</b></p>
              <p>Out of  :  <b>{r.totalMax}</b></p>
              <p>percentage  :  <b>{r.percentage}</b></p>
              <p>Grade  :  <span className="grade">{r.grade}</span></p>
            </div>

            <table className="marks-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Out of</th>
                </tr>
              </thead>
              <tbody>
                {r.subjectMarks?.map((m, i) => (
                  <tr key={i}>
                    <td>{m.subject}</td>
                    <td>{m.marks}</td>
                    <td>{m.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
