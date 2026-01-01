import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Gallery.css";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [section, setSection] = useState("junior");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.REACT_APP_API_URL || "https://bkgis-backend.onrender.com";

  /* ================= FETCH GALLERY ================= */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/public/gallery");
        setItems(res.data || []);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  /* ================= GROUP DATA ================= */
  const filtered = items.filter((i) => i.category === section);

  const grouped = filtered.reduce((acc, item) => {
    acc[item.event] = acc[item.event] || [];
    acc[item.event].push(item);
    return acc;
  }, {});

  if (loading) return <p style={{ textAlign: "center" }}>Loading gallery...</p>;

  return (
    <section className="gallery-simple">

      {/* HEADER */}
      <header className="gallery-header">
        <h1>{section === "junior" ? "Junior Wing Gallery" : "Senior Wing Gallery"}</h1>

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

      {/* ================= EVENT GRID ================= */}
      {!selectedEvent && (
        <div className="event-grid">
          {Object.keys(grouped).length === 0 && (
            <p style={{ textAlign: "center" }}>No photos available</p>
          )}

          {Object.entries(grouped).map(([event, group]) => (
            <div
              key={event}
              className="event-card"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={`${BASE_URL}${group[0].url}`}
                alt={event}
                onError={(e) => (e.target.src = "/no-image.png")}
              />
              <div className="event-info">
                <h3>{event}</h3>
                <span>{group.length} Photos</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= PHOTO VIEW ================= */}
      {selectedEvent && (
        <div className="photo-gallery">
          <h2>{selectedEvent}</h2>

          <div className="photo-grid">
            {grouped[selectedEvent].map((photo, idx) => (
              <div
                key={idx}
                className="photo-box"
                onClick={() => setModalImage(`${BASE_URL}${photo.url}`)}
              >
                <img
                  src={`${BASE_URL}${photo.url}`}
                  alt=""
                  onError={(e) => (e.target.src = "/no-image.png")}
                />
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={() => setSelectedEvent(null)}>
            ← Back
          </button>
        </div>
      )}

      {/* ================= FULL IMAGE MODAL ================= */}
      {modalImage && (
        <div className="modal-full" onClick={() => setModalImage(null)}>
          <img
            src={modalImage}
            alt="Preview"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="close-btn" onClick={() => setModalImage(null)}>
            ×
          </span>
        </div>
      )}
    </section>
  );
}
