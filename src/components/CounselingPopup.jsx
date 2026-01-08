import { useEffect, useState } from "react";
import api from "../api";
import { getDeviceId } from "../utils/device";
import "../styles/CounselingPopup.css";

export default function CounselingPopup() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [lead, setLead] = useState({
    name: "",
    phone: "",
    city: "",
  });

  /* ================= CHECK DEVICE ================= */
  useEffect(() => {
    if (localStorage.getItem("counseling_done")) return;

    api
      .post("/public/counseling/check-device", {
        deviceId: getDeviceId(),
      })
      .then((res) => {
        setShow(res.data?.showForm === true);
      })
      .catch(() => {
        // agar error aaye to popup dikha do
        setShow(true);
      });
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!lead.name.trim()) return alert("Name is required");
    if (!lead.city.trim()) return alert("City is required");

    if (!/^[6-9]\d{9}$/.test(lead.phone))
      return alert("Enter valid 10 digit phone number");

    try {
      setLoading(true);

      const res = await api.post("/public/counseling/submit", {
        ...lead,
        deviceId: getDeviceId(),
      });

      if (res.data?.verified) {
        localStorage.setItem("counseling_done", "1");
        setShow(false);
      }
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 409) {
        localStorage.setItem("counseling_done", "1");
        setShow(false);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-box">
        <h2>Free Admission Counselling</h2>
        <p>Your details will be securely verified</p>

        <input
          placeholder="Full Name"
          value={lead.name}
          onChange={(e) =>
            setLead({ ...lead, name: e.target.value })
          }
        />

        <input
          placeholder="10 digit Mobile Number"
          maxLength={10}
          value={lead.phone}
          onChange={(e) =>
            setLead({
              ...lead,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
        />

        <input
          placeholder="City"
          value={lead.city}
          onChange={(e) =>
            setLead({ ...lead, city: e.target.value })
          }
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Verifying..." : "Verify & Submit"}
        </button>
      </div>
    </div>
  );
}
