import { useNavigate, useLocation } from "react-router-dom";

import profileIcon from "../assets/profile.png";
import announcementsIcon from "../assets/announcements.png";
import examsIcon from "../assets/exams.png";
import hackathonsIcon from "../assets/hackathons.png";
import drivesIcon from "../assets/drives.png";
import permissionsIcon from "../assets/permissions.png";
import timetableIcon from "../assets/timetable.png";
import syllabusIcon from "../assets/exams.png";

export default function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    const basePath = "/dashboard/student";
    const isHome = location.pathname === basePath || location.pathname === `${basePath}/`;
    navigate(path, { replace: !isHome });
  };

  const isActive = (path) =>
    location.pathname.includes(`/dashboard/student/${path}`);

  return (
    <div className="sidebar">
      {/* Profile */}
      <div
        className={`sidebar-item ${isActive("profile") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/student/profile")}
      >
        <img src={profileIcon} className="sidebar-icon" alt="" />
        <span>Profile</span>
      </div>

      <div
        className={`sidebar-item ${isActive("announcements") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/student/announcements")}
      >
        <img src={announcementsIcon} className="sidebar-icon" alt="" />
        <span>Announcements</span>
      </div>

      <div
        className={`sidebar-item ${isActive("exams") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/student/exams")}
      >
        <img src={examsIcon} className="sidebar-icon" alt="" />
        <span>Exams</span>
      </div>

      <div
        className={`sidebar-item ${isActive("hackathons") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/student/hackathons")}
      >
        <img src={hackathonsIcon} className="sidebar-icon" alt="" />
        <span>Hackathons</span>
      </div>

      <div
        className={`sidebar-item ${isActive("drives") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/student/drives")}
      >
        <img src={drivesIcon} className="sidebar-icon" alt="" />
        <span>Drives</span>
      </div>
      
      <div
        className={`sidebar-item ${isActive("permissions") ? "active" : ""}`}
        onClick={() => handleNavigation("/dashboard/student/permissions")}
      >
        <img src={permissionsIcon} className="sidebar-icon" alt="" />
        <span>Permissions</span>
      </div>

      {/* Removed Timetable and Syllabus */}

      {/* Logout */}
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
