import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PdfViewer = () => {
  const { index } = useParams();
  const [pdfSrc, setPdfSrc] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/pdf/view/${index}`
        );

        if (!res.ok) {
          throw new Error("PDF not found");
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        setPdfSrc(blobUrl);
      } catch (err) {
        setError("Unable to load PDF");
      }
    };

    loadPdf();
  }, [index]);

  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!pdfSrc) return <p style={{ textAlign: "center" }}>Loading PDF…</p>;

  return (
    <iframe
      src={pdfSrc}
      title="PDF Viewer"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};

export default PdfViewer;
