import { useNavigate, useLocation } from "react-router-dom";

import profileIcon from "../assets/profile.png";
import announcementsIcon from "../assets/announcements.png";
import examsIcon from "../assets/exams.png";
import hackathonsIcon from "../assets/hackathons.png";
import drivesIcon from "../assets/drives.png";

export default function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.includes(`/dashboard/student/${path}`);

  return (
    <div className="sidebar">
      {/* Profile */}
      <div
        className={`sidebar-item ${isActive("profile") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/student/profile")}
      >
        <img src={profileIcon} className="sidebar-icon" alt="" />
        <span>Profile</span>
      </div>

      <div
        className={`sidebar-item ${isActive("announcements") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/student/announcements")}
      >
        <img src={announcementsIcon} className="sidebar-icon" alt="" />
        <span>Announcements</span>
      </div>

      <div
        className={`sidebar-item ${isActive("exams") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/student/exams")}
      >
        <img src={examsIcon} className="sidebar-icon" alt="" />
        <span>Exams</span>
      </div>

      <div
        className={`sidebar-item ${isActive("hackathons") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/student/hackathons")}
      >
        <img src={hackathonsIcon} className="sidebar-icon" alt="" />
        <span>Hackathons</span>
      </div>

      <div
        className={`sidebar-item ${isActive("drives") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/student/drives")}
      >
        <img src={drivesIcon} className="sidebar-icon" alt="" />
        <span>Drives</span>
      </div>

      {/* Logout */}
      <div className="logout-section">
        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
}
