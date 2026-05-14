import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Homepage = lazy(() => import("./components/Homepage"));
const DailyUpdates = lazy(() => import("./components/DailyUpdates"));
const ResultsSearch = lazy(() => import("./components/ResultsSearch"));
const StudentResultPage = lazy(() => import("./components/StudentResultPage"));
const Gallery = lazy(() => import("./components/Gallery"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const MandatoryDisclosure = lazy(() => import("./components/MandatoryDisclosure"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const TCForm = lazy(() => import("./components/TCForm"));
const Facilities = lazy(() => import("./components/Facilities"));
const ComputerLab = lazy(() => import("./components/Facilities/ComputerLab"));
const ScienceLab = lazy(() => import("./components/Facilities/ScienceLab"));
const Library = lazy(() => import("./components/Facilities/Library"));
const DanceRoom = lazy(() => import("./components/Facilities/DanceRoom"));
const Mess = lazy(() => import("./components/Facilities/Mess"));
const Sports = lazy(() => import("./components/Facilities/Sports"));
const MusicRoom = lazy(() => import("./components/Facilities/MusicRoom"));
const Academics = lazy(() => import("./components/Academics"));
const AdmissionForm = lazy(() => import("./components/Academics/AdmissionForm"));
const BooksList = lazy(() => import("./components/Academics/BooksList"));
const Toppers = lazy(() => import("./components/Academics/Toppers"));
const Curriculum = lazy(() => import("./components/Academics/Curriculum"));

function PublicLayout({ children }) {
  return (
    <div className="main-container">
      <Navbar />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PublicLayout><Homepage /></PublicLayout>} />
          <Route path="/updates" element={<PublicLayout><DailyUpdates /></PublicLayout>} />
          <Route path="/results" element={<PublicLayout><ResultsSearch /></PublicLayout>} />
          <Route path="/result" element={<PublicLayout><StudentResultPage /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
          <Route path="/mandatory" element={<PublicLayout><MandatoryDisclosure /></PublicLayout>} />
          <Route path="/tc" element={<PublicLayout><TCForm /></PublicLayout>} />
          <Route path="/facilities" element={<PublicLayout><Facilities /></PublicLayout>} />
          <Route path="/facilities/computer-lab" element={<PublicLayout><ComputerLab /></PublicLayout>} />
          <Route path="/facilities/science-lab" element={<PublicLayout><ScienceLab /></PublicLayout>} />
          <Route path="/facilities/library" element={<PublicLayout><Library /></PublicLayout>} />
          <Route path="/facilities/dance-room" element={<PublicLayout><DanceRoom /></PublicLayout>} />
          <Route path="/facilities/mess" element={<PublicLayout><Mess /></PublicLayout>} />
          <Route path="/facilities/sports" element={<PublicLayout><Sports /></PublicLayout>} />
          <Route path="/facilities/music-room" element={<PublicLayout><MusicRoom /></PublicLayout>} />
          <Route path="/academics" element={<PublicLayout><Academics /></PublicLayout>} />
          <Route path="/academics/admission-form" element={<PublicLayout><AdmissionForm /></PublicLayout>} />
          <Route path="/academics/books" element={<PublicLayout><BooksList /></PublicLayout>} />
          <Route path="/academics/toppers" element={<PublicLayout><Toppers /></PublicLayout>} />
          <Route path="/academics/curriculum" element={<PublicLayout><Curriculum /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2></PublicLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
