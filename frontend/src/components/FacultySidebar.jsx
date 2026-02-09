import { useNavigate, useLocation } from "react-router-dom";

import profileIcon from "../assets/profile.png";
import permissionsIcon from "../assets/permissions.png";
import timetableIcon from "../assets/timetable.png";
import meetingsIcon from "../assets/meetings.png";

export default function FacultySidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.includes(`/dashboard/faculty/${path}`);

  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${isActive("profile") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/faculty/profile")}
      >
        <img src={profileIcon} className="sidebar-icon" alt="" />
        <span>Profile</span>
      </div>

      <div
        className={`sidebar-item ${isActive("permissions") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/faculty/permissions")}
      >
        <img src={permissionsIcon} className="sidebar-icon" alt="" />
        <span>Permissions</span>
      </div>

      <div
        className={`sidebar-item ${isActive("timetable") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/faculty/timetable")}
      >
        <img src={timetableIcon} className="sidebar-icon" alt="" />
        <span>Timetable</span>
      </div>

      <div
        className={`sidebar-item ${isActive("meetings") ? "active" : ""}`}
        onClick={() => navigate("/dashboard/faculty/meetings")}
      >
        <img src={meetingsIcon} className="sidebar-icon" alt="" />
        <span>Meetings</span>
      </div>

      <div className="logout-section">
        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
}
