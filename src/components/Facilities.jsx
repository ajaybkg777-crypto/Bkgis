import React from "react";
import { Link } from "react-router-dom";
import "../styles/Facilities.css";

export default function Facilities() {
  const facilities = [
    {
      title: "Computer Lab",
      desc: "Modern systems with internet for digital learning.",
      img: "/assets/clab.png",
      path: "/facilities/computer-lab"
    },
    {
      title: "Science Lab",
      desc: "Fully equipped physics, chemistry, and biology labs.",
      img: "/assets/slab.png",
      path: "/facilities/science-lab"
    },
    {
      title: "Library",
      desc: "A vast collection of books and digital resources.",
      img: "/assets/library.png",
      path: "/facilities/library"
    },
    {
      title: "Music Room",
      desc: "Musical instruments for creative expression.",
      img: "/assets/music.png",
      path: "/facilities/music-room"
    },
    {
      title: "Dance Room",
      desc: "Spacious dance studio for artistic growth.",
      img: "/assets/dance.png",
      path: "/facilities/dance-room"
    },
    {
      title: "Sports Ground",
      desc: "Indoor & outdoor games for physical fitness.",
      img: "/assets/sports.png",
      path: "/facilities/sports"
    },
    {
      title: "Mess / Canteen",
      desc: "Nutritious meals in a hygienic environment.",
      img: "/assets/mess.png",
      path: "/facilities/mess"
    }
  ];

  return (
    <section className="facilities-section">
      <h2 className="facilities-title">Our School Facilities</h2>
      <p className="facilities-subtitle">
        We provide top-class infrastructure and resources for overall student development.
      </p>

      <div className="facilities-grid">
        {facilities.map((f, i) => (
          <div key={i} className="facility-card">
            <img src={f.img} alt={f.title} className="facility-img" loading="lazy" />
            <div className="facility-info">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <Link to={f.path} className="btn-view">View More</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
