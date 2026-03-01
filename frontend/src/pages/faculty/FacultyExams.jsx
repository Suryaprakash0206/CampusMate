import { useState } from "react";
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

  const handlePublish = () => {
    if (!formData.subject || !formData.date) return;

    if (editingId) {
      setExams(
        exams.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
    } else {
      const newExam = {
        id: Date.now(),
        ...formData
      };
      setExams([newExam, ...exams]);
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

  const handleDelete = (id) => {
    setExams(exams.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
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
      <div key={item.id} className="exam-card">
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
          <FaTrash onClick={() => handleDelete(item.id)} />
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
