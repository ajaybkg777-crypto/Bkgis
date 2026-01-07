// src/App.js
import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CounselingPopup from "./components/CounselingPopup";

// Public pages
import Homepage from "./components/Homepage";
import DailyUpdates from "./components/DailyUpdates";
import ResultsSearch from "./components/ResultsSearch";
import StudentResultPage from "./components/StudentResultPage";
import Gallery from "./components/Gallery";
import AboutUs from "./components/AboutUs";
import MandatoryDisclosure from "./components/MandatoryDisclosure";
import ContactUs from "./components/ContactUs";
import TCForm from "./components/TCForm";

// Facilities
import Facilities from "./components/Facilities";
import ComputerLab from "./components/Facilities/ComputerLab";
import ScienceLab from "./components/Facilities/ScienceLab";
import Library from "./components/Facilities/Library";
import DanceRoom from "./components/Facilities/DanceRoom";
import Mess from "./components/Facilities/Mess";
import Sports from "./components/Facilities/Sports";
import MusicRoom from "./components/Facilities/MusicRoom";

// Academics
import Academics from "./components/Academics";
import AdmissionForm from "./components/Academics/AdmissionForm";
import BooksList from "./components/Academics/BooksList";
import Toppers from "./components/Academics/Toppers";
import Curriculum from "./components/Academics/Curriculum";



<Route path="/pdf-view/:index" element={<PdfViewer />} />

/* ============ LAYOUT ============ */
function PublicLayout({ children }) {
  return (
    <div className="main-container">
      <Navbar />
      <CounselingPopup />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
}

/* ============ APP ============ */
export default function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<PublicLayout><Homepage /></PublicLayout>} />
          <Route path="/updates" element={<PublicLayout><DailyUpdates /></PublicLayout>} />
          <Route path="/results" element={<PublicLayout><ResultsSearch /></PublicLayout>} />
          <Route path="/result" element={<PublicLayout><StudentResultPage /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
          <Route path="/mandatory" element={<PublicLayout><MandatoryDisclosure /></PublicLayout>} />
          <Route
  path="/tc"
  element={<PublicLayout><TCForm /></PublicLayout>}
/>


          {/* FACILITIES */}
          <Route path="/facilities" element={<PublicLayout><Facilities /></PublicLayout>} />
          <Route path="/facilities/computer-lab" element={<PublicLayout><ComputerLab /></PublicLayout>} />
          <Route path="/facilities/science-lab" element={<PublicLayout><ScienceLab /></PublicLayout>} />
          <Route path="/facilities/library" element={<PublicLayout><Library /></PublicLayout>} />
          <Route path="/facilities/dance-room" element={<PublicLayout><DanceRoom /></PublicLayout>} />
          <Route path="/facilities/mess" element={<PublicLayout><Mess /></PublicLayout>} />
          <Route path="/facilities/sports" element={<PublicLayout><Sports /></PublicLayout>} />
          <Route path="/facilities/music-room" element={<PublicLayout><MusicRoom /></PublicLayout>} />

          {/* ACADEMICS */}
          <Route path="/academics" element={<PublicLayout><Academics /></PublicLayout>} />
          <Route path="/academics/admission-form" element={<PublicLayout><AdmissionForm /></PublicLayout>} />
          <Route path="/academics/books" element={<PublicLayout><BooksList /></PublicLayout>} />
          <Route path="/academics/toppers" element={<PublicLayout><Toppers /></PublicLayout>} />
          <Route path="/academics/curriculum" element={<PublicLayout><Curriculum /></PublicLayout>} />
    
          <Route
            path="*"
            element={
              <PublicLayout>
                <h2 style={{ textAlign: "center" }}>404 – Page Not Found</h2>
              </PublicLayout>
            }
          />

        </Routes>
      </Suspense>
    </Router>
  );
}
