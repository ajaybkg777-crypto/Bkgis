import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Mandatory.css";

const MandatoryDisclosure = () => {
  const emptyState = {
    generalInfo: [],
    documents: [],
    academic: [],
    resultX: [],
    resultXII: [],
    staff: [],
    infrastructure: [],
  };

  const [data, setData] = useState(emptyState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await api.get("/public/disclosures", {
          signal: controller.signal,
        });

        // ✅ SAFE MERGE (IMPORTANT FIX)
        setData({
          ...emptyState,
          ...(res.data || {}),
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load disclosure data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="loading">Loading disclosure data...</p>;
  if (error) return <p className="error">{error}</p>;

  // ✅ Cloudinary already full URL
  const getPdfLink = (url) => (url?.startsWith("http") ? url : null);

  const Section = ({ id, title, children }) => (
    <div className="disclosure-box">
      <h3
        className="section-heading"
        onClick={() => setOpenIndex(openIndex === id ? null : id)}
      >
        {title}
        <span className="chev">{openIndex === id ? "▲" : "▼"}</span>
      </h3>
      <div className={`section-content ${openIndex === id ? "open" : ""}`}>
        <div className="section-inner">{children}</div>
      </div>
    </div>
  );

  return (
    <section className="disclosure-section">
      <h2 className="disclosure-title">MANDATORY PUBLIC DISCLOSURE</h2>

      <Section id="general" title="GENERAL INFORMATION">
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

      <Section id="documents" title="DOCUMENTS AND INFORMATION">
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
  href={item.pdfUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  VIEW
</a>


                ) : (
                  "Not available"
                )}
              </td>
            </>
          )}
        />
      </Section>

      <Section id="resultX" title="RESULT CLASS X">
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

      <Section id="resultXII" title="RESULT CLASS XII">
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

      <Section id="staff" title="STAFF (TEACHING)">
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

      <Section id="infra" title="SCHOOL INFRASTRUCTURE">
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

/* ===== SAFE TABLE COMPONENT ===== */
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
        data.map((item, i) => <tr key={i}>{renderRow(item, i)}</tr>)
      ) : (
        <tr>
          <td colSpan={headers.length} style={{ textAlign: "center" }}>
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default MandatoryDisclosure;
