import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Gallery.css";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [section, setSection] = useState("junior");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(true);

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

  /* ================= FILTER & GROUP ================= */
  const filtered = items.filter((i) => i.category === section);

  const grouped = filtered.reduce((acc, item) => {
    acc[item.event] = acc[item.event] || [];
    acc[item.event].push(item);
    return acc;
  }, {});

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading gallery...</p>;
  }

  return (
    <section className="gallery-simple">

      {/* ================= HEADER ================= */}
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

      {/* ================= EVENT GRID ================= */}
      {!selectedEvent && (
        <div className="event-grid">
          {Object.keys(grouped).length === 0 && (
            <p style={{ textAlign: "center" }}>No gallery available</p>
          )}

          {Object.entries(grouped).map(([event, group]) => (
            <div
              key={event}
              className="event-card"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={group[0].url}
                alt={event}
                onError={(e) => (e.target.src = "/no-image.png")}
              />

              <div className="event-info">
                <h3>{event}</h3>
                <span>{group.length} Media</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MEDIA GRID ================= */}
      {selectedEvent && (
        <div className="photo-gallery">
          <h2>{selectedEvent}</h2>

          <div className="photo-grid">
            {grouped[selectedEvent].map((item, idx) => (
              <div key={idx} className="media-box">

                {/* VIDEO */}
                {item.type === "video" ? (
                  <div
                    className="video-thumb"
                    onClick={() => window.open(item.videoLink, "_blank")}
                  >
                    <img
                      src={item.url}
                      alt="Video Thumbnail"
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                    <span className="play-icon">▶</span>
                  </div>
                ) : (
                  /* PHOTO */
                  <img
                    src={item.url}
                    alt="Gallery"
                    onClick={() => setModalImage(item.url)}
                    onError={(e) => (e.target.src = "/no-image.png")}
                  />
                )}

              </div>
            ))}
          </div>

          <button
            className="back-btn"
            onClick={() => setSelectedEvent(null)}
          >
            ← Back
          </button>
        </div>
      )}

      {/* ================= IMAGE MODAL ================= */}
      {modalImage && (
        <div
          className="modal-full"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Preview"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <span
            className="close-btn"
            onClick={() => setModalImage(null)}
          >
            ×
          </span>
        </div>
      )}
    </section>
  );
}
