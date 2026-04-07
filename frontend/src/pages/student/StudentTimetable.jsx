import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const initialEntries = [
    { day: "Monday", time: "9:00 AM", subject: "Mathematics", room: "A101" },
    { day: "Tuesday", time: "10:00 AM", subject: "Physics", room: "B202" },
    { day: "Wednesday", time: "11:00 AM", subject: "Chemistry", room: "Lab 1" },
];

export default function StudentTimetable() {
    const navigate = useNavigate();

    return (
        <div className="student-page">
            <h2 className="page-title">Class Timetable</h2>

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
