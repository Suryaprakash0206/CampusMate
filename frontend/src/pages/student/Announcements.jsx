import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="announcements-page">
      <h2 className="announcements-heading">Latest Announcements</h2>

      {announcements.map((item) => (
        <div key={item._id} className="student-announcement-card">
          <h3 className="announcement-title">{item.title}</h3>

          <p className="announcement-description">
            {item.description}
          </p>

          <div className="announcement-time">
            <FiClock className="clock-icon" />
            <span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
