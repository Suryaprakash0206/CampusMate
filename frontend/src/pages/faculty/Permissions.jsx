import { useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList
} from "react-icons/fa";

export default function Permissions() {

  const [activeTab, setActiveTab] = useState("Pending");

  const [requests, setRequests] = useState([
    {
      id: 1,
      rollNumber: "24B11CS001",
      title: "Outpass Request",
      reason: "Need extra study time for upcoming semester exams.",
      fromDate: "2026-03-05",
      toDate: "2026-03-07",
      status: "Pending",
      submitted: "2026-02-20"
    },
    {
      id: 2,
      rollNumber: "24B11CS002",
      title: "Outpass Request",
      reason: "Working on final year project discussion.",
      fromDate: "2026-02-25",
      toDate: "2026-02-26",
      status: "Approved",
      submitted: "2026-02-18"
    },
    {
      id: 3,
      rollNumber: "24B11CS003",
      title: "Outpass Request",
      reason: "Want to attend family event.",
      fromDate: "2026-02-20",
      toDate: "2026-02-21",
      status: "Denied",
      submitted: "2026-02-15"
    }
  ]);

  const handleApprove = (id) => {
    setRequests(
      requests.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleDeny = (id) => {
    setRequests(
      requests.map((item) =>
        item.id === id ? { ...item, status: "Denied" } : item
      )
    );
  };

  const pending = requests.filter(r => r.status === "Pending");
  const resolved = requests.filter(r => r.status !== "Pending");

  return (
    <div className="faculty-permissions-page">

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
          <div key={item.id} className="faculty-request-card">

            <div className="faculty-request-left">
              <h4>
                {item.title}
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </h4>

              <p>
                 <strong>Roll No:</strong> {item.rollNumber}
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
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </button>

                <button
                  className="deny-btn"
                  onClick={() => handleDeny(item.id)}
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
