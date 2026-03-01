import { useState, useEffect } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaEdit,
  FaTrash
} from "react-icons/fa";

export default function StudentPermissions() {

  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const studentId = localStorage.getItem("studentId"); // retrieve logged in studentId

  // Fetch student permissions on mount
  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:5000/api/student/permissions/${studentId}`)
        .then(res => res.json())
        .then(data => setRequests(data))
        .catch(err => console.error(err));
    }
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE (optional extension, skipped here for simplicity but UI supports it)
        setRequests(
          requests.map((item) =>
            item._id === editingId
              ? { ...item, ...formData }
              : item
          )
        );
      } else {
        // ADD
        if (!studentId) {
          alert("Student ID missing. Please log in again.");
          return;
        }
        console.log("Submitting Permission:", { ...formData, studentId });
        const response = await fetch("http://localhost:5000/api/student/permissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, studentId })
        });
        const data = await response.json();

        if (response.ok) {
          setRequests([data.permission, ...requests]);
          alert("Permission requested successfully!");
        } else {
          console.error("Backend Error Response:", data);
          alert(`Error adding permission: ${data.message || data.error || 'Unknown error'}`);
          return; // Stop execution on error
        }
      }

      // Reset
      setFormData({
        title: "",
        fromDate: "",
        toDate: "",
        reason: ""
      });

      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      console.error("Submit Exception:", err);
      alert("Network error: Could not submit request.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      fromDate: item.fromDate,
      toDate: item.toDate,
      reason: item.reason
    });

    setEditingId(item._id); // use _id from mongodb
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // optional delete endpoint, removing from UI for now
    setRequests(requests.filter((item) => item._id !== id));
  };

  const pending = requests.filter(r => r.status === "Pending").length;
  const approved = requests.filter(r => r.status === "Approved").length;
  const denied = requests.filter(r => r.status === "Denied").length;

  return (
    <div className="student-permissions-page">

      {/* Header */}
      <div className="permissions-header">
        <div>
          <h2><FaClipboardList /> My Permissions</h2>
          <p>Request and track your permission requests</p>
        </div>

        <button
          className="request-btn"
          onClick={() => {
            setEditingId(null);
            setShowModal(true);
          }}
        >
          + Request Permission
        </button>
      </div>

      {/* Summary */}
      <div className="permission-summary">
        <div className="summary-card pending">
          <FaClock />
          <div>
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="summary-card approved">
          <FaCheckCircle />
          <div>
            <h3>{approved}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="summary-card denied">
          <FaTimesCircle />
          <div>
            <h3>{denied}</h3>
            <p>Denied</p>
          </div>
        </div>
      </div>

      {/* Requests */}
      <div className="requests-section">
        <h3>Your Requests</h3>

        {requests.map((item) => (
          <div key={item._id || item.id} className="request-card">

            <div className="request-header">

              <div className="request-title-row">
                <h4>{item.title}</h4>

                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              {item.status === "Pending" && (
                <div className="request-actions">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(item)}
                  />

                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              )}

            </div>


            <p><strong>Roll No:</strong> {item.studentId || item.rollNumber}</p>
            <p><strong>From:</strong> {item.fromDate}</p>
            <p><strong>To:</strong> {item.toDate}</p>

            <p><strong>Reason:</strong> {item.reason}</p>

            <p className="request-date">
              Submitted: {item.submitted}
            </p>

          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="permission-modal-overlay">
          <div className="permission-modal">

            <div className="permission-modal-header">
              <h3>
                {editingId ? "Edit Permission Request" : "New Permission Request"}
              </h3>
              <span
                className="close-icon"
                onClick={() => setShowModal(false)}
              >
                ×
              </span>
            </div>

            <form onSubmit={handleSubmit} className="permission-form">

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={studentId || "Logging Required"}
                  disabled
                  title="Your roll number is auto-filled."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="permission-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="submit-btn">
                  {editingId ? "Update Request" : "Submit Request"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
