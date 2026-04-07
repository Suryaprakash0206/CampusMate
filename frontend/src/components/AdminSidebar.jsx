import { useNavigate, useLocation } from "react-router-dom";

import profileIcon from "../assets/profile.png";
import timetableIcon from "../assets/timetable.png";
import syllabusIcon from "../assets/exams.png";
import usersIcon from "../assets/permissions.png";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        const basePath = "/dashboard/admin";
        const isHome = location.pathname === basePath || location.pathname === `${basePath}/`;
        navigate(path, { replace: !isHome });
    };

    const isActive = (path) =>
        location.pathname.includes(`/dashboard/admin/${path}`);

    return (
        <div className="sidebar">
            {/* Profile */}
            <div
                className={`sidebar-item ${isActive("profile") ? "active" : ""}`}
                onClick={() => handleNavigation("/dashboard/admin/profile")}
            >
                <img src={profileIcon} className="sidebar-icon" alt="" />
                <span>Profile</span>
            </div>

            {/* Timetable */}
            <div
                className={`sidebar-item ${isActive("timetable") ? "active" : ""}`}
                onClick={() => handleNavigation("/dashboard/admin/timetable")}
            >
                <img src={timetableIcon} className="sidebar-icon" alt="" />
                <span>Timetable</span>
            </div>

            {/* Syllabus */}
            <div
                className={`sidebar-item ${isActive("syllabus") ? "active" : ""}`}
                onClick={() => handleNavigation("/dashboard/admin/syllabus")}
            >
                <img src={syllabusIcon} className="sidebar-icon" alt="" />
                <span>Syllabus</span>
            </div>

            {/* Exams */}
            <div
                className={`sidebar-item ${isActive("exams") ? "active" : ""}`}
                onClick={() => handleNavigation("/dashboard/admin/exams")}
            >
                <img src={syllabusIcon} className="sidebar-icon" alt="" />
                <span>Exams</span>
            </div>

            {/* Users */}
            <div
                className={`sidebar-item ${isActive("users") ? "active" : ""}`}
                onClick={() => handleNavigation("/dashboard/admin/users")}
            >
                <img src={usersIcon} className="sidebar-icon" alt="" />
                <span>Users</span>
            </div>

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
