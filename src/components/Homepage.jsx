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
  

  /* ================= FAQ DATA ================= */
  const faqs = [
    {
      q: "Which board does BKG International School follow?",
      a: "BKG International School follows the CBSE curriculum with a strong focus on academic excellence and holistic development."
    },
   {
  q: "Is BKG International School the best CBSE school in Khargone?",
  a: "Yes, BKG International School is widely recognized as one of the best CBSE and English medium schools in Khargone, Madhya Pradesh."
},
{
  q: "Why parents consider BKG International School a top CBSE school near me?",
  a: "Due to experienced faculty, modern infrastructure, strong academics, sports facilities, and a safe learning environment."
},
{
  q: "Is BKG International School among the top 10 CBSE schools in Khargone?",
  a: "Yes, the school is counted among the top 10 CBSE schools in Khargone for quality education and holistic development."
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
           <h1>
  BKG International School – Best CBSE & English Medium School in Khargone, MP
</h1>

          <p>
  Top CBSE affiliated English medium school in Khargone offering quality
  education, modern infrastructure, and holistic student development.
</p>


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
  BKG International School is recognized as one of the 
  <strong> best CBSE schools in Khargone, Madhya Pradesh</strong>. 
  We are a <strong>top English medium CBSE school near me</strong> for parents 
  searching quality education, discipline, and modern learning methods.
  <br /><br />
  As a <strong>top CBSE school in MP</strong>, we focus on balanced development of 
  intellectual, physical, emotional, and social skills. Our school provides 
  smart classrooms, advanced science and computer laboratories, sports facilities,
  inquiry-based learning, and personalized education pathways.
  <br /><br />
  BKG International School is counted among the 
  <strong> top 10 CBSE schools in Khargone</strong> and is emerging as a 
  <strong> best CBSE school in India</strong> for holistic and value-based education.
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
              autoComplete="name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              autoComplete="off"
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
