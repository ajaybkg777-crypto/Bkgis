import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Mandatory.css";

const API_URL = process.env.REACT_APP_API_URL || "";

const MandatoryDisclosure = () => {
  const [data, setData] = useState({
    generalInfo: [],
    documents: [],
    academic: [],
    resultX: [],
    resultXII: [],
    staff: [],
    infrastructure: [],
  });

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
        setData(res.data || {});
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Disclosure fetch error:", err);
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

      {/* GENERAL INFO */}
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

      {/* DOCUMENTS */}
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
  href={`${process.env.REACT_APP_API_URL}${doc.pdfUrl}`}
  target="_blank"
  rel="noreferrer"
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

      {/* ACADEMIC */}
      <Section id="academic" title="ACADEMIC INFORMATION">
        <Table
          headers={["#", "Title", "Action"]}
          data={data.academic}
          renderRow={(item, i) => (
            <>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>
                {item.pdfUrl ? (
                  <a
                    href={`${API_URL}${item.pdfUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </>
          )}
        />
      </Section>

      {/* RESULT X */}
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

      {/* RESULT XII */}
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

      {/* STAFF */}
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

      {/* INFRA */}
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

/* ========= REUSABLE TABLE ========= */
const Table = ({ headers, data, renderRow }) => (
  <table className="disclosure-table">
    <thead>
      <tr>
        {headers.map((h, i) => (
          <th key={i}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length ? (
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
