import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";

import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";


// Student pages
import StudentHome from "./pages/student/StudentHome";
import Announcements from "./pages/student/Announcements";
import StudentProfile from "./pages/student/StudentProfile";
import Exams from "./pages/student/Exams";
import Hackathons from "./pages/student/Hackathons";
import Drives from "./pages/student/Drives";
import StudentPermissions from "./pages/student/StudentPermissions";

// Faculty pages
import FacultyHome from "./pages/faculty/FacultyHome";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import Permissions from "./pages/faculty/Permissions";
import FacultyDrives from "./pages/faculty/FacultyDrives";
import FacultyExams from "./pages/faculty/FacultyExams";
import FacultyAnnouncements from "./pages/faculty/FacultyAddAnnouncements";
import FacultyHackathons from "./pages/faculty/FacultyAddHackathons";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<StudentLogin />} />
      <Route path="/faculty" element={<FacultyLogin />} />

      {/* Student Dashboard */}

      <Route path="/dashboard/student" element={<StudentDashboard />}>
        <Route index element={<StudentHome />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="permissions" element={<StudentPermissions />} />
        <Route path="exams" element={<Exams />} />
        <Route path="hackathons" element={<Hackathons />} />
        <Route path="drives" element={<Drives />} />
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
      </Route>
    </Routes>
  );
}

export default App;
