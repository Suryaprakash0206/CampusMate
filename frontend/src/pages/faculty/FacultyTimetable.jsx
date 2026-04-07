import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const initialEntries = [
    { day: "Monday", time: "8:00 AM", subject: "Data Structures", room: "C301" },
    { day: "Thursday", time: "2:00 PM", subject: "Algorithms", room: "C302" },
];

export default function FacultyTimetable() {
    const navigate = useNavigate();

    return (
        <div className="faculty-page">
            <h2 className="page-title">My Teaching Timetable</h2>

            <div className="timetable-grid">
                {initialEntries.map((entry, i) => (
                    <div key={i} className="timetable-card" style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <h3 style={{ margin: "0 0 10px 0", color: "#2f5564" }}>{entry.subject}</h3>
                        <div style={{ display: "flex", gap: "15px", color: "#666", fontSize: "14px" }}>
                            <span><FaCalendarAlt /> {entry.day}</span>
                            <span><FaClock /> {entry.time}</span>
                            <span><FaMapMarkerAlt /> {entry.room}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
