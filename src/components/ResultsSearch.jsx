import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api";

import {
  FaSearch,
  FaUser,
  FaListOl,
  FaKey,
  FaSchool,
  FaBookOpen,
} from "react-icons/fa";

import "../styles/ResultsSearch.css";

const ResultsSearch = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    cls: "",
    exam: "",
    pin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.roll || !form.cls || !form.exam || !form.pin) {
      setError("Please fill all required fields");
      return false;
    }

    if (!/^\d{4,10}$/.test(form.roll)) {
      setError("Invalid roll number");
      return false;
    }

    if (!/^\d{4,10}$/.test(form.pin)) {
      setError("Invalid PIN");
      return false;
    }

    return true;
  };

  const search = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!validate()) return;

      setLoading(true);

      try {
        const res = await api.get("/results", {
          params: {
            roll: form.roll,
            name: form.name,
            class: form.cls,
            exam: form.exam,
            pin: form.pin,
          },
        });

        if (!res?.data?.length) {
          setError("No result found. Please check details.");
          return;
        }

        navigate("/result", { state: { result: res.data[0] } });
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [form, navigate]
  );

  return (
    <div className="results-container">
      <motion.div
        className="main-section"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="portal-title">BKGIS Result Portal</h1>
        <p className="portal-subtitle">
          Enter your details to view your academic result
        </p>
      </motion.div>

      <motion.div
        className="search-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={search} className="search-form">

          {/* NAME */}
          <div className="input-group">
            <FaUser className="icon" />
            <input
              name="name"
              placeholder="Student Name (Optional)"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* ROLL */}
          <div className="input-group">
            <FaListOl className="icon" />
            <input
              name="roll"
              placeholder="Roll Number"
              value={form.roll}
              onChange={handleChange}
              required
            />
          </div>

          {/* CLASS */}
          <div className="input-group">
            <FaSchool className="icon" />
            <select name="cls" value={form.cls} onChange={handleChange} required>
              <option value="">Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* EXAM */}
          <div className="input-group">
            <FaBookOpen className="icon" />
            <select name="exam" value={form.exam} onChange={handleChange} required>
              <option value="">Select Exam</option>
              <option value="PT1">PT-1</option>
              <option value="PT2">PT-2</option>
              <option value="Term1">Term-1</option>
              <option value="Term2">Term-2</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          {/* PIN */}
          <div className="input-group">
            <FaKey className="icon" />
            <input
              type="password"
              name="pin"
              placeholder="Security PIN"
              value={form.pin}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <motion.button
            type="submit"
            className="search-btn"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Searching..." : "Search Result"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResultsSearch;
