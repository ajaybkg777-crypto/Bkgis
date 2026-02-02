import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Send } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/ContactUs.css";

export default function Homepage() {
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [calendar, setCalendar] = useState([]);

  /* ================= FAQ DATA ================= */
  const faqs = [
    {
      q: "Which board does BKG International School follow?",
      a: "BKG International School follows the CBSE curriculum with a strong focus on academic excellence and holistic development."
    },
    {
      q: "Is BKG International School one of the best CBSE schools in Khargone?",
      a: "Yes, the school is among the top CBSE English medium schools in Khargone with modern facilities and experienced faculty."
    },
    {
      q: "What classes are offered?",
      a: "Classes are available from Pre-Primary to Senior Secondary level."
    },
    {
      q: "Is transport facility available?",
      a: "Yes, safe and reliable transport facilities are provided for students."
    },
    {
      q: "Does the school focus on sports and activities?",
      a: "Yes, equal importance is given to academics, sports, cultural activities, and personality development."
    },
    {
      q: "How can parents apply for admission?",
      a: "Parents can visit the campus or contact the admission office for complete guidance."
    }
  ];

  /* ================= CONTACT FORM ================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/public/contact/submit", form);
      alert("✅ Message sent successfully!");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      alert("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    api.get("/public/announcements")
      .then(res => setAnnouncements(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="homepage">

      {/* ================= HERO ================= */}
      <header className="hero-section">
        <div className="video-container">
          <video
            className="hero-video"
            src="/assets/school.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="video-overlay" />

          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>BKG International School</h1>
            <p>Dedicated to Excellence. Shaping the Future.</p>

            <div className="hero-buttons">
              <a href="/admissions" className="btn primary">Enroll Now</a>
              <a href="#contact-home" className="btn secondary">Get In Touch</a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-choose-pro">
        <motion.h2 className="section-title">
          Why Choose <span>BKG International School?</span>
        </motion.h2>

        <motion.p className="section-subtitle">
          A trusted CBSE English medium school in Khargone offering modern
          infrastructure, inquiry-based learning, sports excellence,
          experienced faculty, and personalized education.
        </motion.p>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }}
        >
          {["quality", "fun", "modern", "topper", "expert"].map((img, i) => (
            <SwiperSlide key={i}>
              <div className="why-card-slide">
                <img src={`/assets/${img}.png`} alt="BKG School Feature" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq-section">
        <h2 className="section-title">
          Frequently Asked Questions – <span>BKG International School</span>
        </h2>

        <div className="faq-container">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= CONTACT + MAP ================= */}
      <section className="contact-body-pro" id="contact-home">
        <div className="form-box-pro">
          <h2>Get In Touch</h2>
          <p>We’re happy to guide you. Send us a message!</p>

          <form className="contact-form-pro" onSubmit={handleSubmit}>
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            <input name="subject" placeholder="Subject" onChange={handleChange} required />
            <textarea name="message" placeholder="Message" rows="4" onChange={handleChange} required />
            <button type="submit" disabled={loading}>
              <Send size={18} /> {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="map-box-pro">
          <iframe
            title="BKG School Map"
            src="https://www.google.com/maps?q=BKG+International+School,+Khargone,+Madhya+Pradesh&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>

    </div>
  );
}
