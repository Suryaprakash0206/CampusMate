import { useNavigate, useLocation } from "react-router-dom";

import profileIcon from "../assets/profile.png";
import permissionsIcon from "../assets/permissions.png";
import drivesIcon from "../assets/drives.png";
import examsIcon from "../assets/exams.png";
import announcementIcon from "../assets/announcements.png";
import hackathonIcon from "../assets/hackathons.png";
import timetableIcon from "../assets/timetable.png";
import syllabusIcon from "../assets/exams.png";



export default function FacultySidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    const basePath = "/dashboard/faculty";
    const isHome = location.pathname === basePath || location.pathname === `${basePath}/`;
    navigate(path, { replace: !isHome });
  };

  const isActive = (path) =>
    location.pathname.includes(`/dashboard/faculty/${path}`);

  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${isActive("profile") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/faculty/profile")}
      >
        <img src={profileIcon} className="sidebar-icon" alt="" />
        <span>Profile</span>
      </div>
      <div
        className={`sidebar-item ${isActive("announcements") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/faculty/announcements")}
      >
        <img src={announcementIcon} className="sidebar-icon" alt="" />
        <span>Announcements</span>
      </div>
      <div
        className={`sidebar-item ${isActive("hackathons") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/faculty/hackathons")}
      >
        <img src={hackathonIcon} className="sidebar-icon" alt="" />
        <span>Hackathons</span>
      </div>
      {/* Exams */}
      <div
        className={`sidebar-item ${isActive("exams") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/faculty/exams")}
      >
        <img src={examsIcon} className="sidebar-icon" alt="" />
        <span>Exams</span>
      </div>

      <div
        className={`sidebar-item ${isActive("drives") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/faculty/drives")}
      >
        <img src={drivesIcon} className="sidebar-icon" alt="" />
        <span>Drives</span>
      </div>

      <div
        className={`sidebar-item ${isActive("permissions") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/faculty/permissions")}
      >
        <img src={permissionsIcon} className="sidebar-icon" alt="" />
        <span>Permissions</span>
      </div>

      {/* Removed Timetable and Syllabus */}

      <div className="logout-section">
        <button className="logout-btn" onClick={() => {
          localStorage.clear();
          navigate("/");
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}