import React, { useState } from "react";
import "../styles/ContactUs.css";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import api from "../api";

export default function ContactUs() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      await api.post("/contact/submit", form);

      alert("✅ Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      alert("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-pro">

      {/* 🌟 Hero Section */}
      <header className="contact-hero-pro">
        <div className="hero-text">
          <h1>Contact Us</h1>
          <p>We’re here to answer your queries and guide you better.</p>
        </div>
      </header>

      {/* 🏫 Info Cards */}
      <section className="contact-info-pro">
        <a
          href="https://www.google.com/maps?q=BKG+International+School,+Khargone,+Madhya+Pradesh"
          target="_blank"
          rel="noopener noreferrer"
          className="info-card-pro"
        >
          <MapPin className="icon" />
          <div>
            <h3>Visit Us</h3>
            <p>BKG International School</p>
            <p>Khargone - Sanawad Rd, Fata, Bid, M.P. 451001</p>
          </div>
        </a>

        <a href="tel:9826763101" className="info-card-pro">
          <Phone className="icon" />
          <div>
            <h3>Call Us</h3>
            <p>Office / Principal: 098267 63101</p>
          </div>
        </a>

        <a href="mailto:info@bkgis.in" className="info-card-pro">
          <Mail className="icon" />
          <div>
            <h3>Email</h3>
            <p>info@bkgis.in</p>
          </div>
        </a>

        <div className="info-card-pro">
          <Clock className="icon" />
          <div>
            <h3>Working Hours</h3>
            <p>Mon – Sat | 8:00 AM – 4:00 PM</p>
          </div>
        </div>
      </section>

      {/* ✉️ Form + Map */}
      <section className="contact-body-pro">

        <div className="form-box-pro">
          <h2>Get In Touch</h2>
          <p>Feel free to drop us a message. We’ll reach back shortly!</p>

          <form className="contact-form-pro" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              <Send className="send-icon" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="map-box-pro">
          <iframe
            title="BKG International School Map"
            src="https://www.google.com/maps?q=BKG+International+School,+Khargone,+Madhya+Pradesh&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

      </section>
    </div>
  );
}
