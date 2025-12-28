import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Gallery.css";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [section, setSection] = useState("junior");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  /* ===== Counseling Popup State ===== */
  const [showCounseling, setShowCounseling] = useState(false);
  const [savingLead, setSavingLead] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    village: "",
    city: ""
  });

  /* ===== Fetch Gallery ===== */
  useEffect(() => {
    api.get("/public/gallery")
      .then(res => setItems(res.data || []))
      .catch(err => console.error("Gallery fetch error:", err));
  }, []);

  /* ===== Show Counseling Popup (once per user) ===== */
  useEffect(() => {
    if (!items.length) return;

    const done = localStorage.getItem("counseling_done");
    if (!done) {
      const timer = setTimeout(() => setShowCounseling(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [items]);

  /* ===== Submit Counseling Lead ===== */
  const submitLead = async (e) => {
    e.preventDefault();

    if (!lead.name.trim() || !lead.phone.trim()) {
      return alert("Name and phone are required");
    }

    if (!/^\d{7,15}$/.test(lead.phone)) {
      return alert("Enter a valid phone number");
    }

    try {
      setSavingLead(true);
      await api.post("/counseling", lead);

      localStorage.setItem("counseling_done", "1");
      setShowCounseling(false);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("This phone number is already registered");
      } else {
        alert("Failed to save. Please try again.");
      }
    } finally {
      setSavingLead(false);
    }
  };

  /* ===== Data Grouping ===== */
  const filtered = items.filter(i => i.category === section);
  const grouped = filtered.reduce((acc, item) => {
    acc[item.event] = acc[item.event] || [];
    acc[item.event].push(item);
    return acc;
  }, {});

  const baseUrl = (process.env.REACT_APP_API_URL || "http://localhost:5000")
    .replace("/api", "");

  return (
    <section className="gallery-simple">

  

      {/* ===== Gallery Header ===== */}
      <header className="gallery-header">
        <h1>
          {section === "junior"
            ? "Junior Wing Gallery"
            : "Senior Wing Gallery"}
        </h1>

        <div className="gallery-tabs">
          <button
            className={section === "junior" ? "active" : ""}
            onClick={() => {
              setSection("junior");
              setSelectedEvent(null);
            }}
          >
            Junior Section
          </button>

          <button
            className={section === "senior" ? "active" : ""}
            onClick={() => {
              setSection("senior");
              setSelectedEvent(null);
            }}
          >
            Senior Section
          </button>
        </div>
      </header>

      {/* ===== Event Grid ===== */}
      {!selectedEvent && (
        <div className="event-grid">
          {Object.entries(grouped).map(([event, group]) => (
            <div
              key={event}
              className="event-card"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={baseUrl + group[0].url}
                alt={event}
                loading="lazy"
              />
              <div className="event-info">
                <h3>{event}</h3>
                <span>{group.length} Photos</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== Photo Gallery ===== */}
      {selectedEvent && (
        <div className="photo-gallery">
          <h2>{selectedEvent}</h2>

          <div className="photo-grid">
            {grouped[selectedEvent].map((photo, idx) => (
              <div
                key={idx}
                className="photo-box"
                onClick={() => setModalImage(baseUrl + photo.url)}
              >
                <img src={baseUrl + photo.url} alt="" loading="lazy" />
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={() => setSelectedEvent(null)}>
            ← Back
          </button>
        </div>
      )}

      {/* ===== Image Modal ===== */}
     {modalImage && (
  <div className="modal-full" onClick={() => setModalImage(null)}>
    <img
      src={modalImage}
      alt="Preview"
      className="modal-image"
      onClick={(e) => e.stopPropagation()}
    />
    <span className="close-btn" onClick={() => setModalImage(null)}>✕</span>
  </div>
)}

    </section>
  );
}
