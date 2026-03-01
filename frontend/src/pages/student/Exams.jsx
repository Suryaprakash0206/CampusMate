import { useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function StudentExams() {
  const [exams] = useState([
    {
      id: 1,
      subject: "Data Structures",
      type: "Semester",
      date: "2026-03-06",
      time: "03:00",
      venue: "BGB 310"
    }
  ]);

  return (
    <div className="student-exams-page">
      <h2 className="student-exams-heading">Exams</h2>

      <div className="student-exams-grid">
        {exams.map((item) => (
          <div key={item.id} className="student-exam-card">

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
