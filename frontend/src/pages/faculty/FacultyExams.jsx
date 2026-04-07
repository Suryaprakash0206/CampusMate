import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowLeft
} from "react-icons/fa";

export default function FacultyExams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/exams")
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((err) => console.error("Error fetching exams:", err));
  }, []);

  return (
    <div className="faculty-exams-page">
      {/* Header */}
      <div className="exams-header">
        <h2>Exams (View Only)</h2>
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
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
