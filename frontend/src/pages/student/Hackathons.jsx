import { useState, useEffect } from "react";
import { FaClock, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function Hackathons() {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/hackathons")
      .then((res) => res.json())
      .then((data) => setHackathons(data))
      .catch((err) => console.error("Error fetching hackathons:", err));
  }, []);

  return (
    <div className="student-hackathons-page">
      <h2 className="student-hackathon-heading">Hackathons</h2>

      {hackathons.map((item) => (
        <div key={item._id} className="student-hackathon-card">

          <h3>{item.title}</h3>
          <p className="company-name">{item.companyName}</p>

          <div className="info-row">
            <FaClock className="info-icon" />
            <span>Deadline: {item.deadline}</span>
          </div>

          <div className="info-row">
            <FaMapMarkerAlt className="info-icon" />
            <span>{item.place}</span>
          </div>

          <a
            href={item.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="register-link"
          >
            Register Here <FaExternalLinkAlt />
          </a>
        </div>
      ))}
    </div>
  );
}
