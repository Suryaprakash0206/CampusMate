import { Outlet } from "react-router-dom";
import FacultySidebar from "../components/FacultySidebar";
import Topbar from "../components/Topbar";

export default function FacultyDashboard() {
  return (
    <div className="dashboard-wrapper">
      <Topbar />

      <div className="dashboard">
        <FacultySidebar />

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
