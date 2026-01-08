import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api";

import { 
  FaSearch, 
  FaUser, 
  FaListOl, 
  FaKey, 
  FaSchool, 
  FaBookOpen 
} from "react-icons/fa";

import "../styles/ResultsSearch.css";

export default function ResultsSearch() {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [cls, setCls] = useState("");
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const search = async (e) => {
    e.preventDefault();

    if (!roll || !pin || !cls || !exam) {
      alert("⚠️ Please fill Name, Roll, Class, Exam and PIN!");
      return;
    }

    setLoading(true);

    const q = [];
    q.push(`roll=${encodeURIComponent(roll)}`);
    q.push(`pin=${encodeURIComponent(pin)}`);
    q.push(`class=${encodeURIComponent(cls)}`);
    q.push(`exam=${encodeURIComponent(exam)}`);
    if (name) q.push(`name=${encodeURIComponent(name)}`);

    const url = `/public/results?${q.join("&")}`;

    try {
      const res = await api.get(url);

      if (!res.data || res.data.length === 0) {
        alert("No results found! Please check your details.");
        return;
      }

      navigate("/result", { state: { result: res.data[0] } });
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="results-container">
      <motion.div
        className="main-section"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="portal-title">BKGIS Result Portal</h1>
        <p className="portal-subtitle">
          Enter your details below to check your result
        </p>
      </motion.div>

      <motion.div
        className="search-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={search} className="search-form">

          {/* NAME */}
          <div className="input-group">
            <FaUser className="icon" />
            <input
              placeholder="Enter Student Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* ROLL */}
          <div className="input-group">
            <FaListOl className="icon" />
            <input
              placeholder="Enter Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </div>

          {/* CLASS WITH ICON */}
          <div className="input-group">
            <FaSchool className="icon" />
            <select
              className="select-input"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="Nursery">Nursery</option>
              <option value="KG1">KG1</option>
              <option value="KG2">KG2</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          {/* EXAM WITH ICON */}
          <div className="input-group">
            <FaBookOpen className="icon" />
            <select
              className="select-input"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
            >
              <option value="">Select Exam</option>
              <option value="PT1">PT-1</option>
              <option value="PT2">PT-2</option>
              <option value="Term1">Term-1</option>
              <option value="Term2">Term-2</option>
              <option value="Annual">Annual Exam</option>
            </select>
          </div>

          {/* PIN */}
          <div className="input-group">
            <FaKey className="icon" />
            <input
              type="password"
              placeholder="Enter Security PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="search-btn"
            disabled={loading}
          >
            {loading ? "Fetching Result..." : (
              <>
                <FaSearch /> Search Result
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
