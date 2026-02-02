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
              img: "/assets/director_sir.jpg",
              name: "Mr. Hariom Gupta",
              title: "Director, BKG International School",
              message:
                "“बीकेजी क्लासेस” खरगोन शहर में शिक्षा के क्षेत्र का एक विश्वसनीय नाम है। अब हम “बीकेजी इंटरनेशनल स्कूल” के रूप में विद्यार्थियों को एक नई दिशा देने जा रहे हैं। हमारा उद्देश्य निमाड़ क्षेत्र के बच्चों को बड़े शहरों जैसी आधुनिक, सर्वसुविधायुक्त एवं तकनीकी शिक्षा उनके ही शहर में उपलब्ध कराना है। हमें विश्वास है कि आपकी वही आस्था और सहयोग, बीकेजी इंटरनेशनल स्कूल को भी नई ऊँचाइयों तक ले जाएगा।",
            },
            {
              img: "/assets/principal_mam.jpg",
              name: "Mrs. Pallavi Dawande",
              title: "Principal, BKG International School",
              message:
               Dear Parents and Well-Wishers,

Warm greetings from all of us at BKG International School – the Best CBSE School in Khargone.

As we begin a new academic session, I extend a heartfelt welcome to all our students, staff, and parents. Each new year at BKG International School marks another milestone — a dream achieved and a new goal set. Every member of our school community works with dedication and sincerity to turn aspirations into accomplishments.

At BKG International School, we continuously strive to maintain the highest standards of academics while nurturing a warm, inspiring environment for holistic growth. We aim to instill core values like Respect, Integrity, Compassion, and Excellence so our students are prepared for the global future. Our experienced and caring teachers serve as strong role models, keeping the ethos of our school shining bright.

As Nelson Mandela said, “Education is the most powerful weapon you can use to change the world.” BKG International School stands as that pillar of education in Khargone — nurturing intellect, character, and leadership. Together with our dedicated teachers, motivated students, and supportive parents, we shape a generation ready to face challenges with confidence.

Our caring and qualified teachers act as mentors and role models, helping each student grow in knowledge and character. We also encourage 21st-century skills like teamwork, communication, creativity, and critical thinking.

A school’s foundation stands firmly on four essential pillars — sound academics, self-discipline, excellence in sports, and moral and spiritual growth. As the head of the institution, my constant effort is to strengthen these pillars of BKG International School, and for this, I seek the unwavering support of all parents who have entrusted their children to our care.

To the parents, my humble advice is this — respect and encourage your children, for it nurtures their self-confidence and pride. Let us value their unique talents, whether in academics, sports, or the arts. At the same time, let us not expect too much, too soon. Allow them to grow naturally, without the weight of unrealistic expectations.

Remember — “Give us a sapling, and we’ll give you a mighty tree bearing sweet fruits.”

Let’s continue our journey together at BKG International School — the Top CBSE School in Khargone — ensuring that every child learns, grows, and succeeds with pride.

Principal
Pallavi Dawande
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
                  <p>{person.message}</p>
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
