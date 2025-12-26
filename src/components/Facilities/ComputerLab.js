import React from "react";
import "../../styles/Facilities.css";

export default function ComputerLab() {
  return (
    <section className="facilities-section">
      <h2 className="facilities-title">Computer Lab</h2>
      <p className="facilities-subtitle">
       BKG International School, Khargone offers a state-of-the-art computer lab equipped with modern PCs, high-speed internet connectivity, smart learning tools, and project-based practical sessions. Our computer education program focuses on digital literacy, coding fundamentals, internet safety, and real-world computer skills to prepare students for future academic and career success. As one of the best CBSE schools in Khargone, we ensure hands-on technology learning in a safe and structured environment.y.
      </p>
      <div className="facility-detail">
        <img src="/assets/clab.png" alt="Computer Lab" className="facility-detail-img" />
      </div>
    </section>
  );
}
