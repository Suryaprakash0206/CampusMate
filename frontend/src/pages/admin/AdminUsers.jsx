import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DEMO_STUDENTS = [
    { id: "STU001", name: "Riya Sharma", email: "riya.sharma@campus.edu", department: "Computer Science", phone: "9876543210" },
    { id: "STU002", name: "Arjun Mehta", email: "arjun.mehta@campus.edu", department: "Electronics", phone: "9123456789" },
    { id: "STU003", name: "Priya Nair", email: "priya.nair@campus.edu", department: "Mechanical", phone: "9012345678" },
    { id: "STU004", name: "Karan Patel", email: "karan.patel@campus.edu", department: "Civil", phone: "9988776655" },
    { id: "STU005", name: "Sneha Iyer", email: "sneha.iyer@campus.edu", department: "Computer Science", phone: "9871234560" },
];

const DEMO_FACULTY = [
    { id: "FAC001", name: "Dr. Vijay Kumar", email: "vijay.kumar@campus.edu", department: "Computer Science", phone: "9000011111" },
    { id: "FAC002", name: "Prof. Anita Rao", email: "anita.rao@campus.edu", department: "Mathematics", phone: "9000022222" },
    { id: "FAC003", name: "Dr. Suresh Reddy", email: "suresh.reddy@campus.edu", department: "Physics", phone: "9000033333" },
    { id: "FAC004", name: "Prof. Meena Joshi", email: "meena.joshi@campus.edu", department: "Electronics", phone: "9000044444" },
];

export default function AdminUsers() {
    const [activeTab, setActiveTab] = useState("students");
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const [studentRes, facultyRes] = await Promise.all([
                    fetch("http://localhost:5000/api/student/all"),
                    fetch("http://localhost:5000/api/faculty/all"),
                ]);

                if (studentRes.ok) {
                    const data = await studentRes.json();
                    setStudents(data);
                } else {
                    setStudents(DEMO_STUDENTS);
                }

                if (facultyRes.ok) {
                    const data = await facultyRes.json();
                    setFaculty(data);
                } else {
                    setFaculty(DEMO_FACULTY);
                }
            } catch (err) {
                console.error("Could not fetch users, using demo data:", err);
                setStudents(DEMO_STUDENTS);
                setFaculty(DEMO_FACULTY);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const currentData = activeTab === "students" ? students : faculty;

    const filtered = currentData.filter((u) => {
        const q = searchQuery.toLowerCase();
        return (
            (u.name || u.fullName || "").toLowerCase().includes(q) ||
            (u.email || "").toLowerCase().includes(q) ||
            (u.department || "").toLowerCase().includes(q) ||
            (u.id || u.studentId || u.facultyId || "").toLowerCase().includes(q)
        );
    });

    const navigate = useNavigate();

    return (
        <div className="admin-page">
            <h2 className="admin-page-title">User Management</h2>

            {/* Tab Switcher */}
            <div className="admin-tab-switcher">
                <button
                    className={`admin-tab-btn ${activeTab === "students" ? "admin-tab-active" : ""}`}
                    onClick={() => { setActiveTab("students"); setSearchQuery(""); }}
                >
                    Students ({students.length})
                </button>
                <button
                    className={`admin-tab-btn ${activeTab === "faculty" ? "admin-tab-active" : ""}`}
                    onClick={() => { setActiveTab("faculty"); setSearchQuery(""); }}
                >
                    Faculty ({faculty.length})
                </button>
            </div>

            {/* Search Bar */}
            <div className="admin-search-bar">
                <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-search-input"
                />
            </div>

            {/* Users Table */}
            <div className="admin-table-card">
                <h3>
                    {activeTab === "students" ? "Student" : "Faculty"} Accounts
                    {searchQuery && ` — ${filtered.length} result(s)`}
                </h3>

                {loading ? (
                    <p className="admin-empty">Loading users...</p>
                ) : filtered.length === 0 ? (
                    <p className="admin-empty">No {activeTab} found matching your search.</p>
                ) : (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((user, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <span className="admin-user-id">
                                                {user.id || user.studentId || user.facultyId || "—"}
                                            </span>
                                        </td>
                                        <td>{user.name || user.fullName || "—"}</td>
                                        <td>{user.email || "—"}</td>
                                        <td>{user.department || "—"}</td>
                                        <td>{user.phone || user.phoneNumber || "—"}</td>
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
