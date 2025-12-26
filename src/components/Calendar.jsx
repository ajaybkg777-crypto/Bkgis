import React, { useState } from "react";

export default function RealCalendar({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popup, setPopup] = useState(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const getEvents = (day) => {
    return events.filter((ev) => {
      const d = new Date(ev.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  return (
    <div className="real-calendar-box">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>‹</button>
        <h3>{currentDate.toLocaleString("default", { month: "long" })} {year}</h3>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>›</button>
      </div>

      <div className="week-row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div className="week-name" key={w}>{w}</div>
        ))}
      </div>

      <div className="days-grid">
        {Array(firstDay).fill(null).map((_, i) => (
          <div className="empty" key={"e" + i}></div>
        ))}

        {[...Array(days)].map((_, i) => {
          const day = i + 1;
          const todayEvents = getEvents(day);

          return (
            <div
              key={day}
              className={`day-box ${todayEvents.length > 0 ? "has-event" : ""}`}
              onClick={() => setPopup({ day, todayEvents })}
            >
              <span className="day-number">{day}</span>
              {todayEvents.length > 0 && <div className="event-dot"></div>}
            </div>
          );
        })}
      </div>

      {popup && (
        <div className="event-popup">
          <div className="event-popup-content">
            <h4>Events on {popup.day}</h4>

            {popup.todayEvents.length === 0 ? (
              <p>No events</p>
            ) : (
              popup.todayEvents.map((ev) => (
                <div className="event-item" key={ev._id}>
                  <strong>{ev.title}</strong>
                  <p>{ev.description}</p>
                </div>
              ))
            )}

            <button onClick={() => setPopup(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
