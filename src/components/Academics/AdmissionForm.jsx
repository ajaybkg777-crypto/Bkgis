import React from "react";
import "../../styles/Academics.css";

export default function AdmissionForm() {
  return (
    <section className="academics-section">
      <h2 className="academics-title">Admission Form</h2>

      <p className="academics-subtitle">
        Admissions Form will open shortly. Please check back soon.
      </p>

      {/* COMING SOON */}
      <div className="coming-soon-box">
        <h3>🚧 Coming Soon</h3>
        <p>
          The online admission form is currently under preparation.
          <br />
          It will be available very soon.
        </p>
      </div>
    </section>
  );
}
