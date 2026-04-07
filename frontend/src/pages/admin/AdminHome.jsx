export default function AdminHome() {
    return (
        <div className="admin-home">
            <div className="admin-welcome-card">
                <h2>Welcome, Admin 👋</h2>
                <p>Manage your campus from one place. Use the sidebar to navigate.</p>
                <div className="admin-stats">
                    <div className="stat-box">
                        <span className="stat-icon">🕐</span>
                        <h3>Timetable</h3>
                        <p>Manage class schedules for students and faculty</p>
                    </div>
                    <div className="stat-box">
                        <span className="stat-icon">📚</span>
                        <h3>Syllabus</h3>
                        <p>Update and track course syllabi each semester</p>
                    </div>
                    <div className="stat-box">
                        <span className="stat-icon">👥</span>
                        <h3>Users</h3>
                        <p>View and manage student and faculty accounts</p>
                    </div>
                    <div className="stat-box">
                        <span className="stat-icon">👤</span>
                        <h3>Profile</h3>
                        <p>Update your admin account information</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
