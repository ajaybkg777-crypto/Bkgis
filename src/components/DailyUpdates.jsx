import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/DailyUpdate.css";

export default function DailyUpdates() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/public/announcements")
      .then((r) => setItems(r.data || []))
      .catch(() => setItems([]));
  }, []);

  const base = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

  return (
    <section className="daily-updates-wrap">
      <div className="daily-updates-header">
        <h2>Daily Updates & Important Notices</h2>
        <p>Parents and students can check the latest school announcements here.</p>
      </div>

      {items.length === 0 && <p className="daily-empty">No updates available right now.</p>}

      {items.map((it) => {
        const attachments = Array.isArray(it.attachments)
          ? it.attachments
          : it.attachments
            ? [it.attachments]
            : [];
        const created = it.createdAt || it.date || it.updatedAt;
        return (
          <article key={it._id} className="daily-card">
            <h4>{it.title}</h4>
            <p>{it.body}</p>
            {attachments.length > 0 && (
              <div className="daily-attachments">
                {attachments.map((a, i) => (
                  <a key={i} href={a.startsWith("http") ? a : base + a} target="_blank" rel="noreferrer">
                    Attachment {i + 1}
                  </a>
                ))}
              </div>
            )}
            <small>{created ? new Date(created).toLocaleString() : ""}</small>
          </article>
        );
      })}
    </section>
  );
}
