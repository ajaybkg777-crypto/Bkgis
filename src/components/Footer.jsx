import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            BKG International School is committed to excellence in education, 
            nurturing innovation, discipline, and leadership among students for a brighter future.
          </p>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <FaMapMarkerAlt className="footer-icon" />{" "}
            <a
              href="https://www.google.com/maps?q=BKG+International+School,+Khargone+-+Sanawad+Rd,+Fata,+Bid,+Khargone,+Madhya+Pradesh+451001"
              target="_blank"
              rel="noreferrer"
            >
              Khargone - Sanawad Rd, Fata, Bid, Khargone, Madhya Pradesh 451001
            </a>
          </p>
          <p>
            <FaPhoneAlt className="footer-icon" />{" "}
            <a href="tel:09826763101">098267 63101</a>
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com/@bkginternationalschoolkhargone" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <strong>BKG International School</strong> — Dedicated to Excellence
        </p>
      </div>
    </footer>
  );
}