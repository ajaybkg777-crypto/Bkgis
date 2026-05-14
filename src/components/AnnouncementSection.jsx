import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/AnnouncementSection.css";

export default function AnnouncementSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/public/announcements")
      .then((res) => setItems((res.data || []).slice(0, 5)))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="announcement-section">
      <div className="announcement-head">
        <h2>Important Announcements</h2>
        <Link to="/updates" className="announcement-link">
          View All
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="announcement-empty">No announcements available right now.</p>
      ) : (
        <div className="announcement-list">
          {items.map((item) => (
            <article key={item._id} className="announcement-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
