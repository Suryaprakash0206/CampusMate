import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function StudentExams() {
  const [exams, setExams] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/api/student/exams")
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="student-exams-page">
      <h2 className="student-exams-heading">Exams</h2>

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
