import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function FacultyExams() {
  const [exams, setExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    time: "",
    venue: "",
    type: "Quiz"
  });


  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/exams")
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((err) => console.error("Error fetching exams:", err));
  }, []);

  const handlePublish = async () => {
    if (!formData.subject || !formData.date) return;

    if (editingId) {
      // Optional update endpoint logic can be added here
      console.log("Update not implemented");
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/faculty/exams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (response.ok) {
          setExams([...exams, data.exam].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } else {
          alert("Error publishing exam");
        }
      } catch (err) {
        console.error("Publish error:", err);
      }
    }

    setFormData({
      subject: "",
      date: "",
      time: "",
      venue: "",
      type: "Quiz"
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/exams/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setExams(exams.filter((item) => item._id !== id));
      } else {
        alert("Error deleting exam");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      subject: item.subject,
      date: item.date,
      time: item.time,
      venue: item.venue,
      type: item.type
    });
    setEditingId(item._id);
    setShowModal(true);
  };

  return (
    <div className="faculty-exams-page">

      {/* Header */}
      <div className="exams-header">
        <h2>Exams</h2>

        <button
          className="add-exam-btn"
          onClick={() => {
            setEditingId(null);
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Exam
        </button>
      </div>

      {/* Exam Cards */}

      {/* Exams List */}
      {exams.length === 0 ? (
        <div className="exams-empty">
          <FaCalendarAlt />
          <h3>No exams yet</h3>
          <p>Click "Add Exam" to create one.</p>
        </div>
      ) : (
        <div className="exams-grid">
          {exams.map((item) => (
            <div key={item._id || item.id} className="exam-card">
              <div className="exam-content">
                <h3>{item.subject}</h3>

                <span className="exam-type">
                  {item.type}
                </span>

                <div className="exam-info">
                  <div>
                    <FaCalendarAlt className="exam-icon" />
                    {item.date}
                  </div>

                  <div>
                    <FaClock className="exam-icon" />
                    {item.time}
                  </div>

                  <div>
                    <FaMapMarkerAlt className="exam-icon" />
                    {item.venue}
                  </div>
                </div>
              </div>

              <div className="exam-actions">
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item._id || item.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="exam-modal-overlay">
          <div className="exam-modal">

            <div className="exam-modal-header">
              <h3>{editingId ? "Edit Exam" : "New Exam"}</h3>
              <FaTimes onClick={() => setShowModal(false)} />
            </div>

            <label>Subject</label>
            <input
              type="text"
              placeholder="e.g. Data Structures"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />

            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <label>Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />

            <label>Venue</label>
            <input
              type="text"
              placeholder="e.g. Hall A"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
            />

            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Quiz</option>
              <option>Midterm</option>
              <option>Semester</option>
            </select>

            <button className="exam-publish-btn" onClick={handlePublish}>
              {editingId ? "Update Exam" : "Add Exam"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
