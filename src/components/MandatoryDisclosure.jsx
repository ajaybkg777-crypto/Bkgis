// src/components/Mandatory.js
import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Mandatory.css";

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
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await api.get("/disclosures", { signal: controller.signal });
        setData(res.data || {});
      } catch (err) {
        if (err.name !== "AbortError") setError("Unable to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
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

      {/* GENERAL INFORMATION */}
      <Section id="general" title="GENERAL INFORMATION">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Information</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.generalInfo?.length ? (
              data.generalInfo.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.info}</td>
                  <td>{item.detail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No general information available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* DOCUMENTS */}
      <Section id="documents" title="DOCUMENTS AND INFORMATION">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.documents?.length ? (
              data.documents.map((doc, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{doc.name}</td>
                  <td>
                    {doc.pdfUrl ? (
                      <a href={doc.pdfUrl} target="_blank" rel="noreferrer">
                        VIEW
                      </a>
                    ) : (
                      "Not available"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No documents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* ACADEMIC */}
      <Section id="academic" title="ACADEMIC INFORMATION">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.academic?.length ? (
              data.academic.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    {item.pdfUrl ? (
                      <a href={item.pdfUrl} target="_blank">
                        VIEW
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No academic information available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* RESULT X */}
      <Section id="resultX" title="RESULT CLASS X">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Registered</th>
              <th>Passed</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.resultX?.length ? (
              data.resultX.map((r, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{r.year}</td>
                  <td>{r.registered}</td>
                  <td>{r.passed}</td>
                  <td>{r.percentage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No class X results available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* RESULT XII */}
      <Section id="resultXII" title="RESULT CLASS XII">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Registered</th>
              <th>Passed</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.resultXII?.length ? (
              data.resultXII.map((r, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{r.year}</td>
                  <td>{r.registered}</td>
                  <td>{r.passed}</td>
                  <td>{r.percentage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No class XII results available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* STAFF */}
      <Section id="staff" title="STAFF (TEACHING)">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Information</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.staff?.length ? (
              data.staff.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.info}</td>
                  <td>{item.detail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No staff data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* INFRA */}
      <Section id="infra" title="SCHOOL INFRASTRUCTURE">
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Information</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.infrastructure?.length ? (
              data.infrastructure.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.info}</td>
                  <td>{item.detail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No infrastructure info available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>
    </section>
  );
};

export default MandatoryDisclosure;
