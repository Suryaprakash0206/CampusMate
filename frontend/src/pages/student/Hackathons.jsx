import { useState } from "react";
import { FaClock, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function Hackathons() {
  const [hackathons] = useState([
    {
      id: 1,
      title: "Google Summer Internship 2026",
      company: "Google",
      deadline: "Mar 11, 2026",
      place: "kjhvg",
      link: "https://example.com"
    }
  ]);

  return (
    <div className="student-hackathons-page">
      <h2 className="student-hackathon-heading">Hackathons</h2>

      {hackathons.map((item) => (
        <div key={item.id} className="student-hackathon-card">

          <h3>{item.title}</h3>
          <p className="company-name">{item.company}</p>

          <div className="info-row">
            <FaClock className="info-icon" />
            <span>Deadline: {item.deadline}</span>
          </div>

          <div className="info-row">
            <FaMapMarkerAlt className="info-icon" />
            <span>{item.place}</span>
          </div>

          <a
            href={item.link}
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
