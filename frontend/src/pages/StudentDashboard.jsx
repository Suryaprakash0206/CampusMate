import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import Topbar from "../components/Topbar";

export default function StudentDashboard() {
  return (
    <div className="dashboard-wrapper">
      <Topbar />
      <div className="dashboard">
        <StudentSidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
