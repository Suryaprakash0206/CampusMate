import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import AdminLogin from "./pages/AdminLogin";

import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Student pages
import StudentHome from "./pages/student/StudentHome";
import Announcements from "./pages/student/Announcements";
import StudentProfile from "./pages/student/StudentProfile";
import Exams from "./pages/student/Exams";
import Hackathons from "./pages/student/Hackathons";
import Drives from "./pages/student/Drives";
import StudentPermissions from "./pages/student/StudentPermissions";
import StudentTimetable from "./pages/student/StudentTimetable";
import StudentSyllabus from "./pages/student/StudentSyllabus";

// Faculty pages
import FacultyHome from "./pages/faculty/FacultyHome";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import Permissions from "./pages/faculty/Permissions";
import FacultyDrives from "./pages/faculty/FacultyDrives";
import FacultyExams from "./pages/faculty/FacultyExams";
import FacultyAnnouncements from "./pages/faculty/FacultyAddAnnouncements";
import FacultyHackathons from "./pages/faculty/FacultyAddHackathons";
import FacultyTimetable from "./pages/faculty/FacultyTimetable";
import FacultySyllabus from "./pages/faculty/FacultySyllabus";

// Admin pages
import AdminHome from "./pages/admin/AdminHome";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminTimetable from "./pages/admin/AdminTimetable";
import AdminSyllabus from "./pages/admin/AdminSyllabus";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminExams from "./pages/admin/AdminExams";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<StudentLogin />} />
      <Route path="/faculty" element={<FacultyLogin />} />
      <Route path="/admin" element={<AdminLogin />} />

      {/* Student Dashboard */}
      <Route path="/dashboard/student" element={<StudentDashboard />}>
        <Route index element={<StudentHome />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="permissions" element={<StudentPermissions />} />
        <Route path="exams" element={<Exams />} />
        <Route path="hackathons" element={<Hackathons />} />
        <Route path="drives" element={<Drives />} />
        <Route path="timetable" element={<StudentTimetable />} />
        <Route path="syllabus" element={<StudentSyllabus />} />
      </Route>

      {/* Faculty Dashboard */}
      <Route path="/dashboard/faculty" element={<FacultyDashboard />}>
        <Route index element={<FacultyHome />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="announcements" element={<FacultyAnnouncements />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="hackathons" element={<FacultyHackathons />} />
        <Route path="drives" element={<FacultyDrives />} />
        <Route path="exams" element={<FacultyExams />} />
        <Route path="timetable" element={<FacultyTimetable />} />
        <Route path="syllabus" element={<FacultySyllabus />} />
      </Route>

      {/* Admin Dashboard */}
      <Route path="/dashboard/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="timetable" element={<AdminTimetable />} />
        <Route path="syllabus" element={<AdminSyllabus />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="exams" element={<AdminExams />} />
      </Route>
    </Routes>
  );
}

export default App;
