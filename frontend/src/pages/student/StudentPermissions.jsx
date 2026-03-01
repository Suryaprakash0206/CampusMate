import { useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaEdit,
  FaTrash
} from "react-icons/fa";

export default function StudentPermissions() {

  const [requests, setRequests] = useState([
    {
      id: 1,
      rollNumber:"24B11CS001",
      title: "Outpass Request",
      reason: "Need to attend my cousin's wedding function.",
      fromDate: "2026-03-05",
      toDate: "2026-03-07",
      status: "Pending",
      submitted: "2026-03-01"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    rollNumber: "",
    title: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      setRequests(
        requests.map((item) =>
          item.id === editingId
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      // ADD
      const newRequest = {
        id: Date.now(),
        ...formData,
        status: "Pending",
        submitted: new Date().toISOString().split("T")[0]
      };

      setRequests([newRequest, ...requests]);
    }

    // Reset
    setFormData({
      rollNumber: "",
      title: "",
      fromDate: "",
      toDate: "",
      reason: ""
    });

    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      fromDate: item.fromDate,
      toDate: item.toDate,
      reason: item.reason
    });

    setEditingId(item.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setRequests(requests.filter((item) => item.id !== id));
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
          <div key={item.id} className="request-card">

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


            <p><strong>Roll No:</strong> {item.rollNumber}</p>
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
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
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
