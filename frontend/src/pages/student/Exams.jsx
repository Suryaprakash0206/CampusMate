import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";

export default function StudentExams() {
  const [exams, setExams] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/api/student/exams")
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error(err));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="exams-page">
      <h2>Upcoming Exams</h2>

      <div className="student-exams-grid">
        {exams.map((item) => (
          <div key={item._id || item.id} className="student-exam-card">

            <h3>{item.subject}</h3>

            <span className="student-exam-type">
              {item.type}
            </span>

            <div className="student-exam-info">
              <div>
                <FaCalendarAlt className="student-exam-icon" />
                {item.date}
              </div>

              <div>
                <FaClock className="student-exam-icon" />
                {item.time}
              </div>

              <div>
                <FaMapMarkerAlt className="student-exam-icon" />
                {item.venue}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
