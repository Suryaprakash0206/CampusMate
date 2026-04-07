import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaArrowLeft
} from "react-icons/fa";

export default function Permissions() {

  const [activeTab, setActiveTab] = useState("Pending");

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/permissions")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error("Error fetching permissions:", err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/permissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setRequests(
          requests.map((item) =>
            item._id === id ? { ...item, status } : item
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = (id) => updateStatus(id, "Approved");
  const handleDeny = (id) => updateStatus(id, "Denied");

  const pending = requests.filter(r => r.status === "Pending");
  const resolved = requests.filter(r => r.status !== "Pending");

  const navigate = useNavigate();

  return (
    <div className="permissions-page">
      {/* ===== Header ===== */}
      <div className="faculty-permissions-header">
        <div>
          <h2><FaClipboardList /> Permission Requests</h2>
          <p>Review and manage student outpass requests</p>
        </div>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="faculty-summary">

        <div className="faculty-summary-card pending">
          <FaClock />
          <div>
            <h3>{pending.length}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="faculty-summary-card approved">
          <FaCheckCircle />
          <div>
            <h3>{requests.filter(r => r.status === "Approved").length}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="faculty-summary-card denied">
          <FaTimesCircle />
          <div>
            <h3>{requests.filter(r => r.status === "Denied").length}</h3>
            <p>Denied</p>
          </div>
        </div>

      </div>

      {/* ===== Tabs ===== */}
      <div className="faculty-tabs">
        <button
          className={activeTab === "Pending" ? "active-tab" : ""}
          onClick={() => setActiveTab("Pending")}
        >
          Pending ({pending.length})
        </button>

        <button
          className={activeTab === "Resolved" ? "active-tab" : ""}
          onClick={() => setActiveTab("Resolved")}
        >
          Resolved ({resolved.length})
        </button>
      </div>

      {/* ===== Requests Section ===== */}
      <div className="faculty-requests-container">

        {(activeTab === "Pending" ? pending : resolved).map((item) => (
          <div key={item._id || item.id} className="faculty-request-card">

            <div className="faculty-request-left">
              <h4>
                {item.title}
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </h4>

              <p>
                <strong>Roll No:</strong> {item.studentId || item.rollNumber}
              </p>

              <p><strong>From:</strong> {item.fromDate}</p>
              <p><strong>To:</strong> {item.toDate}</p>

              <p className="faculty-reason">
                "{item.reason}"
              </p>

              <p className="faculty-submitted">
                Submitted: {item.submitted}
              </p>
            </div>

            {item.status === "Pending" && (
              <div className="faculty-actions">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(item._id || item.id)}
                >
                  Approve
                </button>

                <button
                  className="deny-btn"
                  onClick={() => handleDeny(item._id || item.id)}
                >
                  Deny
                </button>
              </div>
            )}

          </div>
        ))}

        {activeTab === "Pending" && pending.length === 0 && (
          <p className="no-requests">No pending requests</p>
        )}

        {activeTab === "Resolved" && resolved.length === 0 && (
          <p className="no-requests">No resolved requests</p>
        )}

      </div>

    </div>
  );
}
