import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-page">

      {/* ---------- 1. School Introduction ---------- */}
      <section className="about-intro" id="introduction">
        <div className="intro-glass">
          <h2>
  <span classname="school-name">BKG International School</span>
  <br/>
  <span classname="school-tagline">Dedicated to Excellence</span>
</h2>


          <p>
            <b>BKG International School</b> is a beacon of modern learning and holistic growth.
            We blend <span className="highlight">academic excellence</span> with 
            <span className="highlight"> value-based education</span> to shape students 
            for success in <b>competitive exams</b> and in life.  
            With world-class teaching, digital classrooms, and caring mentors, 
            we prepare our students to shine confidently in every field.
          </p>
        </div>
      </section>
      
      
    {/* ---------- 2. Mission ---------- */}
<section className="about-mission" id="mission">
  <div className="mission-card glass-card">
    <div className="mission-icon">🎯</div>
    <h3>Our Mission</h3>
    <p>
      The mission of <b>BKG International School, Khargone</b> is to deliver 
      high-quality and student-centric <b>CBSE education</b> that supports academic 
      excellence, discipline, and all-round development. As one of the 
      <span className="highlight"> best CBSE and English medium schools in Khargone</span>, 
      we aim to create a strong educational foundation that prepares students for 
      academic success, competitive examinations, and real-world challenges.
      <br /><br />
      Our mission is to nurture confident, responsible, and skilled learners through 
      experienced teachers, modern learning infrastructure, and value-based education, 
      establishing BKG International School among the 
      <b> top schools in Khargone</b> and a trusted choice for parents seeking quality education.
    </p>
  </div>
</section>


     {/* ---------- 3. Vision ---------- */}
<section className="about-vision" id="vision">
  <div className="vision-card glass-card">
    <div className="vision-icon">🌍</div>
    <h3>Our Vision</h3>
    <p>
      The vision of <b>BKG International School, Khargone</b> is to be recognized as a 
      <span className="highlight"> top English medium and best CBSE school in Khargone</span> 
      by providing an inclusive, innovative, and future-ready learning environment. 
      We envision an institution where every child develops strong academic skills, 
      moral values, leadership qualities, and a lifelong passion for learning.
      <br /><br />
      Our long-term vision is to be counted among the 
      <b> top 10 schools in Khargone</b>, shaping future leaders who are confident, 
      compassionate, technologically aware, and socially responsible — ready to excel 
      in higher education and contribute positively to society.
    </p>
  </div>
</section>



      {/* ---------- 4. Leadership / Principal Message ---------- */}
      <section className="message-slider" id="leadership">
        <h3 className="section-title" style={{ textAlign: "center", marginBottom: "40px" }}>
           Leadership & Principal’s Message
        </h3>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="director-swiper"
        >
          {[
            {
              img: "/assets/founder.jpg",
              name: "Mr. Hariom Gupta",
              title: "Founder, BKG International School",
             message: `
BKG Classes, a trusted and well-known name in education in Khargone, is now proudly transforming into BKG International School, Khargone.
With a vision to shape the future of students, our mission is to provide modern, world-class CBSE education with advanced infrastructure, smart classrooms, and technology-driven learning—comparable to top schools in metropolitan cities—right here in the Nimar region.
We are confident that your continued trust and support will help BKG International School, the best CBSE school in Khargone, scale new heights of excellence in education.
`
 
             {[
            {
              img: "/assets/director.jpg",
              name: "Mrs. Parnita Gupta",
              title: "Director, BKG International School",
             message: `
BKG International School is a top-rated school in Khargone, committed to providing high-quality education. Our motto is to deliver education in a way that nurtures learning without creating unnecessary pressure on students. BKG is proudly recognized as one of the best educational groups in Khargone. We consistently strive to offer excellent academic standards along with the holistic development of every student—focusing on intellectual, physical, emotional, and moral growth. We remain dedicated to delivering the best in education, and we sincerely thank parents and well-wishers for their trust and support in making BKG International School the leading CBSE school in Khargone.
`
 },
            {
              img: "/assets/principal_mam.jpg",
              name: "Mrs. Pallavi Dawande",
              title: "Principal, BKG International School",
             message: `
Dear Parents and Well-Wishers,

Warm greetings from all of us at BKG International School – the Best CBSE School in Khargone.
As we begin a new academic session, I extend a heartfelt welcome to all our students, staff, and parents. Each new year at BKG International School marks another milestone — a dream achieved and a new goal set.
At BKG International School, we strive for academic excellence while nurturing values like Respect, Integrity, Compassion, and Excellence.
As Nelson Mandela said, “Education is the most powerful weapon you can use to change the world.”
Together with parents and teachers, we shape confident, responsible, and capable learners.

Principal  
Pallavi Dawande
`

            },
          ].map((person, i) => (
            <SwiperSlide key={i}>
              <div className="message-slide">
                <div className="message-left">
                  <img src={person.img} alt={person.name} loading="lazy" />
                </div>
                <div className="message-right">
                  <h2>{person.name}</h2>
                  <h4>{person.title}</h4>
                 <p style={{ whiteSpace: "pre-line" }}>
  {person.message}
</p>

                  <a href={`/messages/${i}`} className="btn read-more">
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
