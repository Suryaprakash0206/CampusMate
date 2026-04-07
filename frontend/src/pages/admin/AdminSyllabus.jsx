import { useState, useEffect } from "react";

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function AdminSyllabus() {
    const [activeTab, setActiveTab] = useState("student");
    const [syllabusData, setSyllabusData] = useState([]);
    const [form, setForm] = useState({ subject: "", semester: "1st", credits: "", description: "" });
    const [formError, setFormError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Fetch syllabus from backend whenever the active tab changes
    const fetchSyllabus = async (role) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/syllabus?role=${role}`);
            if (res.ok) setSyllabusData(await res.json());
        } catch (err) {
            console.error("Error fetching syllabus:", err);
        }
    };

    useEffect(() => { fetchSyllabus(activeTab); }, [activeTab]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        setFormError("");
        setSuccessMsg("");
        if (!form.subject.trim() || !form.credits) {
            setFormError("Subject name and credits are required.");
            return;
        }
        if (isNaN(form.credits) || Number(form.credits) <= 0) {
            setFormError("Credits must be a positive number.");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/api/admin/syllabus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, credits: Number(form.credits), role: activeTab }),
            });
            if (res.ok) {
                setForm({ subject: "", semester: "1st", credits: "", description: "" });
                setSuccessMsg(`Subject added to ${activeTab === "student" ? "Student" : "Faculty"} Syllabus.`);
                setTimeout(() => setSuccessMsg(""), 2500);
                fetchSyllabus(activeTab);
            } else {
                setFormError("Failed to add subject.");
            }
        } catch (err) {
            setFormError("Server error. Is the backend running?");
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/admin/syllabus/${id}`, { method: "DELETE" });
            fetchSyllabus(activeTab);
        } catch (err) {
            console.error("Error deleting entry:", err);
        }
    };

    return (
        <div className="admin-page">
            <h2 className="admin-page-title">Syllabus Management</h2>

            {/* Tab Switcher */}
            <div className="admin-tab-switcher">
                <button
                    className={`admin-tab-btn ${activeTab === "student" ? "admin-tab-active" : ""}`}
                    onClick={() => { setActiveTab("student"); setFormError(""); setSuccessMsg(""); }}
                >
                    Student Syllabus
                </button>
                <button
                    className={`admin-tab-btn ${activeTab === "faculty" ? "admin-tab-active" : ""}`}
                    onClick={() => { setActiveTab("faculty"); setFormError(""); setSuccessMsg(""); }}
                >
                    Faculty Syllabus
                </button>
            </div>

            {/* Add Subject Form */}
            <div className="admin-form-card">
                <h3>Add Subject</h3>
                <div className="admin-form-grid">
                    <div className="admin-form-group">
                        <label>Subject Name</label>
                        <input name="subject" placeholder="e.g. Data Structures" value={form.subject} onChange={handleChange} />
                    </div>
                    <div className="admin-form-group">
                        <label>Semester</label>
                        <select name="semester" value={form.semester} onChange={handleChange}>
                            {SEMESTERS.map((s) => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="admin-form-group">
                        <label>Credits</label>
                        <input name="credits" type="number" min="1" max="6" placeholder="e.g. 4" value={form.credits} onChange={handleChange} />
                    </div>
                    <div className="admin-form-group admin-form-full">
                        <label>Description / Topics</label>
                        <input name="description" placeholder="e.g. Arrays, Trees, Graphs..." value={form.description} onChange={handleChange} />
                    </div>
                </div>
                {formError && <p className="admin-error">{formError}</p>}
                {successMsg && <p className="admin-success">{successMsg}</p>}
                <button className="admin-add-btn" onClick={handleAdd}>+ Add Subject</button>
            </div>

            {/* Syllabus Table */}
            <div className="admin-table-card">
                <h3>{activeTab === "student" ? "Student" : "Faculty"} Syllabus — {syllabusData.length} Subjects</h3>
                {syllabusData.length === 0 ? (
                    <p className="admin-empty">No subjects yet. Add one above.</p>
                ) : (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Subject</th>
                                    <th>Semester</th>
                                    <th>Credits</th>
                                    <th>Topics / Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {syllabusData.map((item, i) => (
                                    <tr key={item._id || i}>
                                        <td>{i + 1}</td>
                                        <td>{item.subject}</td>
                                        <td>{item.semester}</td>
                                        <td>{item.credits}</td>
                                        <td>{item.description || "—"}</td>
                                        <td>
                                            <button className="admin-delete-btn" onClick={() => handleDelete(item._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
