import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBook, FaInfoCircle } from "react-icons/fa";

const initialSyllabus = [
    { subject: "Mathematics", semester: "3rd", credits: 4, description: "Calculus, Differential Equations, Linear Algebra" },
    { subject: "Physics", semester: "1st", credits: 3, description: "Mechanics, Waves, Optics, Thermodynamics" },
];

export default function StudentSyllabus() {
    const navigate = useNavigate();

    return (
        <div className="student-page">
            <h2 className="page-title">Course Syllabus</h2>

            <div className="syllabus-list">
                {initialSyllabus.map((item, i) => (
                    <div key={i} className="syllabus-card" style={{ background: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                            <h3 style={{ margin: 0, color: "#2f5564" }}><FaBook /> {item.subject}</h3>
                            <span style={{ background: "#e0f2f1", color: "#00796b", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>Semester: {item.semester}</span>
                        </div>
                        <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "14px" }}>{item.description}</p>
                        <div style={{ color: "#888", fontSize: "12px" }}>
                            <FaInfoCircle /> Credits: {item.credits}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
