import React from "react";
import { Link } from "react-router-dom";
import "../styles/Academics.css";

export default function Academics() {
  const academics = [
    {
      title: "Admission Form",
      desc: "Download or fill the admission form for new enrollments with complete details.",
      img: "/assets/admission.png",
      path: "/academics/admission-form",
    },
    {
      title: "Curriculum",
      desc: "Explore our comprehensive curriculum designed to meet global education standards.",
      img: "/assets/curriculum.png",
      path: "/academics/curriculum",
    },
    {
      title: "Books List",
      desc: "Check the updated list of books and reference materials for all classes.",
      img: "/assets/books.png",
      path: "/academics/books",
    },
    {
      title: "Toppers",
      desc: "Meet our school toppers who have excelled in academics and inspired others.",
      img: "/assets/toppers.png",
      path: "/academics/toppers",
    },
  ];

  return (
    <section className="academics-section">
      <h2 className="academics-title">Our Academics</h2>
      <p className="academics-subtitle">
        We provide a balanced academic structure focused on innovation, discipline, and excellence.
      </p>

      <div className="academics-grid">
        {academics.map((a, i) => (
          <div key={i} className="academics-card">
            <img src={a.img} alt={a.title} className="academics-img" loading="lazy" />
            <div className="academics-info">
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <Link to={a.path} className="btn-view">View More</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
