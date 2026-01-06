import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PdfViewer = () => {
  const { index } = useParams();
  const [pdfSrc, setPdfSrc] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pdf/view/${index}`
      );

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      setPdfSrc(blobUrl);
    };

    loadPdf();
  }, [index]);

  if (!pdfSrc) return <p style={{ textAlign: "center" }}>Loading PDF…</p>;

  return (
    <iframe
      src={pdfSrc}
      title="PDF Viewer"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
};

export default PdfViewer;
