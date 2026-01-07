import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Mandatory.css";

/* ================= CONSTANTS ================= */
const EMPTY_STATE = {
  generalInfo: [],
  documents: [],
  resultX: [],
  resultXII: [],
  staff: [],
  infrastructure: [],
};

/* ================= HELPERS ================= */
const getPdfLink = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;

  // ✅ SAFE fallback (prevents build crash)
  return process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}${url}`
    : url;
};

/* ================= SECTION COMPONENT ================= */
const Section = ({ id, title, openSection, setOpenSection, children }) => (
  <div className="disclosure-box">
    <h3
      className="section-heading"
      onClick={() => setOpenSection(openSection === id ? null : id)}
    >
      {title}
      <span className="chev">{openSection === id ? "▲" : "▼"}</span>
    </h3>

    <div className={`section-content ${openSection === id ? "open" : ""}`}>
      <div className="section-inner">{children}</div>
    </div>
  </div>
);

/* ================= TABLE COMPONENT ================= */
const Table = ({ headers, data = [], renderRow }) => (
  <table className="disclosure-table">
    <thead>
      <tr>
        {headers.map((h, i) => (
          <th key={i}>{h}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {data.length > 0 ? (
        data.map((item, i) => (
          <tr key={i}>{renderRow(item, i)}</tr>
        ))
      ) : (
        <tr>
          <td colSpan={headers.length} className="no-data">
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

/* ================= MAIN COMPONENT ================= */
const MandatoryDisclosure = () => {
  const [data, setData] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDisclosure = async () => {
      try {
        const res = await api.get("/public/disclosures", {
          signal: controller.signal,
        });

        setData({ ...EMPTY_STATE, ...(res.data || {}) });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load disclosure data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDisclosure();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="loading">Loading disclosure data…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="disclosure-section">
      <h2 className="disclosure-title">MANDATORY PUBLIC DISCLOSURE</h2>

      <Section
        id="general"
        title="GENERAL INFORMATION"
        openSection={openSection}
        setOpenSection={setOpenSection}
      >
        <Table
          headers={["#", "Information", "Detail"]}
          data={data.generalInfo}
          renderRow={(item, i) => (
            <>
              <td>{i + 1}</td>
              <td>{item.info}</td>
              <td>{item.detail}</td>
            </>
          )}
        />
      </Section>

      <Section
        id="documents"
        title="DOCUMENTS AND INFORMATION"
        openSection={openSection}
        setOpenSection={setOpenSection}
      >
        <Table
          headers={["#", "Document", "Action"]}
          data={data.documents}
          renderRow={(item, i) => (
            <>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>
                {item.pdfUrl ? (
                  <a
                    href={getPdfLink(item.pdfUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VIEW
                  </a>
                ) : (
                  <span className="muted">Not available</span>
                )}
              </td>
            </>
          )}
        />
      </Section>

      <Section
        id="resultX"
        title="RESULT CLASS X"
        openSection={openSection}
        setOpenSection={setOpenSection}
      >
        <Table
          headers={["#", "Year", "Registered", "Passed", "Percentage"]}
          data={data.resultX}
          renderRow={(r, i) => (
            <>
              <td>{i + 1}</td>
              <td>{r.year}</td>
              <td>{r.registered}</td>
              <td>{r.passed}</td>
              <td>{r.percentage}</td>
            </>
          )}
        />
      </Section>

      <Section
        id="resultXII"
        title="RESULT CLASS XII"
        openSection={openSection}
        setOpenSection={setOpenSection}
      >
        <Table
          headers={["#", "Year", "Registered", "Passed", "Percentage"]}
          data={data.resultXII}
          renderRow={(r, i) => (
            <>
              <td>{i + 1}</td>
              <td>{r.year}</td>
              <td>{r.registered}</td>
              <td>{r.passed}</td>
              <td>{r.percentage}</td>
            </>
          )}
        />
      </Section>

      <Section
        id="staff"
        title="STAFF (TEACHING)"
        openSection={openSection}
        setOpenSection={setOpenSection}
      >
        <Table
          headers={["#", "Information", "Detail"]}
          data={data.staff}
          renderRow={(item, i) => (
            <>
              <td>{i + 1}</td>
              <td>{item.info}</td>
              <td>{item.detail}</td>
            </>
          )}
        />
      </Section>

      <Section
        id="infra"
        title="SCHOOL INFRASTRUCTURE"
        openSection={openSection}
        setOpenSection={setOpenSection}
      >
        <Table
          headers={["#", "Information", "Detail"]}
          data={data.infrastructure}
          renderRow={(item, i) => (
            <>
              <td>{i + 1}</td>
              <td>{item.info}</td>
              <td>{item.detail}</td>
            </>
          )}
        />
      </Section>
    </section>
  );
};

export default MandatoryDisclosure;
