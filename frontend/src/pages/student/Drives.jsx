import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaUserGraduate, FaBriefcase, FaArrowLeft } from "react-icons/fa";

export default function Drives() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/student/drives");
      if (response.ok) {
        const data = await response.json();
        setDrives(data);
      }
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="drives-page">
      <h2>Placement Drives</h2>

      {drives.length === 0 ? (
        <div className="drives-empty" style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
          <FaBriefcase style={{ fontSize: "3rem", marginBottom: "1rem" }} />
          <h3>No upcoming drives</h3>
        </div>
      ) : (
        drives.map((item) => (
          <div key={item._id} className="student-hackathon-card">
            <h3>{item.role}</h3>
            <p className="company-name" style={{ fontWeight: "bold" }}>{item.company}</p>

            <div className="info-row">
              <FaClock className="info-icon" />
              <span>Deadline: {item.date}</span>
            </div>

            <div className="info-row">
              <FaMapMarkerAlt className="info-icon" />
              <span>Location: {item.venue}</span>
            </div>

            <div className="info-row">
              <FaUserGraduate className="info-icon" />
              <span>Eligibility: {item.eligibility}</span>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="register-link"
              >
                Register Here <FaExternalLinkAlt />
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}
