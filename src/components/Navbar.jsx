import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFacilities, setOpenFacilities] = useState(false);
  const [openAcademics, setOpenAcademics] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`school-header ${showNavbar ? "nav-show" : "nav-hide"}`}>
      <div className="middle-bar">
        <img src="/assets/logo.png" alt="School Logo" className="school-logo" />
        <div className="school-title">
          <h1>BKG INTERNATIONAL SCHOOL - Best CBSE School in khargone</h1>
          <p className="affiliation">AFFILIATION NO.: 1031363</p>
        </div>
      </div>

      <nav className="nav-bar" aria-label="Main navigation">
        <div className="menu desktop-menu">
          <NavLink to="/" end>Home</NavLink>

          <div
            className="dropdown"
            onMouseEnter={() => setOpenFacilities(true)}
            onMouseLeave={() => setOpenFacilities(false)}
          >
            <NavLink to="/facilities">
              <span className="dropdown-title">Facilities ▾</span>
            </NavLink>
            {openFacilities && (
              <div className="dropdown-content">
                <NavLink to="/facilities/computer-lab">Computer Lab</NavLink>
                <NavLink to="/facilities/science-lab">Science Lab</NavLink>
                <NavLink to="/facilities/dance-room">Dance Room</NavLink>
                <NavLink to="/facilities/music-room">Music Room</NavLink>
                <NavLink to="/facilities/library">Library</NavLink>
                <NavLink to="/facilities/mess">Mess / Canteen</NavLink>
                <NavLink to="/facilities/sports">Sports Ground</NavLink>
              </div>
            )}
          </div>

          <div
            className="dropdown"
            onMouseEnter={() => setOpenAcademics(true)}
            onMouseLeave={() => setOpenAcademics(false)}
          >
            <NavLink to="/academics"><span className="dropdown-title">Academics ▾</span></NavLink>
            {openAcademics && (
              <div className="dropdown-content">
                <NavLink to="/academics/admission-form">Admission Form</NavLink>
                <NavLink to="/academics/curriculum">Curriculum</NavLink>
                <NavLink to="/academics/books">Books List</NavLink>
                <NavLink to="/academics/toppers">Toppers</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/results">Results</NavLink>
          <NavLink to="/updates" className="announce-link">Announcements</NavLink>
          <NavLink to="/tc">TC</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/mandatory">Mandatory Disclosure</NavLink>
        </div>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((s) => !s)}
        >
          ☰
        </button>

        {menuOpen && (
          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/facilities" onClick={closeMenu}>Facilities</NavLink>
            <NavLink to="/academics" onClick={closeMenu}>Academics</NavLink>
            <NavLink to="/results" onClick={closeMenu}>Results</NavLink>
            <NavLink to="/updates" onClick={closeMenu}>Announcements</NavLink>
            <NavLink to="/tc" onClick={closeMenu}>TC</NavLink>
            <NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            <NavLink to="/mandatory" onClick={closeMenu}>Mandatory Disclosure</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
