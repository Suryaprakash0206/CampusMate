import { useState, useEffect } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

export default function AdminTimetable() {
    const [activeTab, setActiveTab] = useState("student");
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({ day: "Monday", time: "8:00 AM", subject: "", room: "" });
    const [formError, setFormError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Fetch entries from backend whenever the active tab changes
    const fetchEntries = async (role) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/timetable?role=${role}`);
            if (res.ok) setEntries(await res.json());
        } catch (err) {
            console.error("Error fetching timetable:", err);
        }
    };

    useEffect(() => { fetchEntries(activeTab); }, [activeTab]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        setFormError("");
        setSuccessMsg("");
        if (!form.subject.trim() || !form.room.trim()) {
            setFormError("Please fill in Subject and Room fields.");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/api/admin/timetable", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, role: activeTab }),
            });
            if (res.ok) {
                setForm({ day: "Monday", time: "8:00 AM", subject: "", room: "" });
                setSuccessMsg(`Entry added for ${activeTab === "student" ? "Students" : "Faculty"}.`);
                setTimeout(() => setSuccessMsg(""), 2500);
                fetchEntries(activeTab);
            } else {
                setFormError("Failed to add entry.");
            }
        } catch (err) {
            setFormError("Server error. Is the backend running?");
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/admin/timetable/${id}`, { method: "DELETE" });
            fetchEntries(activeTab);
        } catch (err) {
            console.error("Error deleting entry:", err);
        }
    };

    return (
        <div className="admin-page">
            <h2 className="admin-page-title">Timetable Management</h2>

            {/* Tab Switcher */}
            <div className="admin-tab-switcher">
                <button
                    className={`admin-tab-btn ${activeTab === "student" ? "admin-tab-active" : ""}`}
                    onClick={() => { setActiveTab("student"); setFormError(""); setSuccessMsg(""); }}
                >
                    Student Timetable
                </button>
                <button
                    className={`admin-tab-btn ${activeTab === "faculty" ? "admin-tab-active" : ""}`}
                    onClick={() => { setActiveTab("faculty"); setFormError(""); setSuccessMsg(""); }}
                >
                    Faculty Timetable
                </button>
            </div>

            {/* Add Entry Form */}
            <div className="admin-form-card">
                <h3>Add Timetable Entry</h3>
                <div className="admin-form-grid">
                    <div className="admin-form-group">
                        <label>Day</label>
                        <select name="day" value={form.day} onChange={handleChange}>
                            {DAYS.map((d) => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="admin-form-group">
                        <label>Time Slot</label>
                        <select name="time" value={form.time} onChange={handleChange}>
                            {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="admin-form-group">
                        <label>Subject</label>
                        <input name="subject" placeholder="e.g. Mathematics" value={form.subject} onChange={handleChange} />
                    </div>
                    <div className="admin-form-group">
                        <label>Room / Lab</label>
                        <input name="room" placeholder="e.g. A101" value={form.room} onChange={handleChange} />
                    </div>
                </div>
                {formError && <p className="admin-error">{formError}</p>}
                {successMsg && <p className="admin-success">{successMsg}</p>}
                <button className="admin-add-btn" onClick={handleAdd}>+ Add Entry</button>
            </div>

            {/* Timetable Table */}
            <div className="admin-table-card">
                <h3>{activeTab === "student" ? "Student" : "Faculty"} Timetable — {entries.length} Entries</h3>
                {entries.length === 0 ? (
                    <p className="admin-empty">No entries yet. Add one above.</p>
                ) : (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Subject</th>
                                    <th>Room / Lab</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry, i) => (
                                    <tr key={entry._id || i}>
                                        <td>{i + 1}</td>
                                        <td>{entry.day}</td>
                                        <td>{entry.time}</td>
                                        <td>{entry.subject}</td>
                                        <td>{entry.room}</td>
                                        <td>
                                            <button className="admin-delete-btn" onClick={() => handleDelete(entry._id)}>Remove</button>
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
