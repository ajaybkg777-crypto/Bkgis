import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RealCalendar from "./Calendar";

export default function Homepage() {
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [calendar, setCalendar] = useState([]);

  /* ================= FAQ DATA ================= */
  const faqs = [
    {
      q: "Which board does BKG International School follow?",
      a: "BKG International School follows the CBSE curriculum with a focus on academic excellence and holistic development."
    },
    {
      q: "Is BKG International School a good CBSE school in Khargone?",
      a: "Yes, BKG International School is one of the best CBSE English medium schools in Khargone with modern infrastructure and experienced teachers."
    },
    {
      q: "What classes are available?",
      a: "The school offers education from Pre-Primary to Senior Secondary level."
    },
    {
      q: "Does the school provide transport facilities?",
      a: "Yes, safe and reliable transport facilities are available for students."
    },
    {
      q: "Does the school focus on sports and activities?",
      a: "Along with academics, the school focuses on sports, cultural activities, and personality development."
    },
    {
      q: "How can parents apply for admission?",
      a: "Parents can visit the school campus or contact the admission office for guidance."
    }
  ];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    api.get("/public/announcements")
      .then(res => setAnnouncements(res.data.slice(0, 3)))
      .catch(() => {});

    api.get("/public/gallery")
      .then(res => setGallery(res.data.slice(0, 6)))
      .catch(() => {});

    api.get("/public/calendar")
      .then(res =>
        setCalendar(
          res.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        )
      )
      .catch(() => {});
  }, []);

  return (
    <div className="homepage">

      {/* ================= HERO SECTION ================= */}
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
            transition={{ duration: 0.9 }}
          >
            <h1>BKG International School</h1>
            <p>Dedicated to Excellence. Shaping the Future. Creating Leaders.</p>

            <div className="hero-buttons">
              <a href="/admissions" className="btn primary">Enroll Now</a>
              <a href="/contact" className="btn secondary">Contact Us</a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-choose-pro" id="why-bkg">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span>BKG International School in Khargone?</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          BKG International School is a leading CBSE English medium school in Khargone,
          offering modern infrastructure, inquiry-based learning, experienced faculty,
          strong sports programs, and personalized education for every child.
        </motion.p>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
          }}
          className="why-swiper-card"
        >
          {[
            { img: "/assets/quality.png", alt: "Best CBSE school in Khargone" },
            { img: "/assets/fun.png", alt: "Interactive learning environment" },
            { img: "/assets/modern.png", alt: "Modern classrooms" },
            { img: "/assets/topper.png", alt: "Academic excellence" },
            { img: "/assets/expert.png", alt: "Experienced faculty" }
          ].map((item, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="why-card-slide"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={item.img} alt={item.alt} loading="lazy" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="message-slider" id="leadership">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {[
            {
              img: "/assets/director_sir.jpg",
              name: "Mr. Hariom Gupta",
              title: "Director, BKG International School",
              message: "बीकेजी इंटरनेशनल स्कूल का उद्देश्य निमाड़ के बच्चों को आधुनिक शिक्षा देना है।"
            },
            {
              img: "/assets/principal_mam.jpg",
              name: "Mrs. Pallavi Dawande",
              title: "Principal, BKG International School",
              message: "हम विद्यार्थियों के सर्वांगीण विकास और नैतिक मूल्यों पर विशेष ध्यान देते हैं।"
            }
          ].map((p, i) => (
            <SwiperSlide key={i}>
              <div className="message-slide">
                <div className="message-left">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="message-right">
                  <h2>{p.name}</h2>
                  <h4>{p.title}</h4>
                  <p>{p.message}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="faq-section" id="faq">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions – <span>BKG International School</span>
        </motion.h2>

        <div className="faq-container">
          {faqs.map((item, index) => (
            <motion.details
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

    </div>
  );
}
