import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

export default function AdminDashboard() {
    return (
        <div className="dashboard-wrapper">
            <Topbar />
            <div className="dashboard">
                <AdminSidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
