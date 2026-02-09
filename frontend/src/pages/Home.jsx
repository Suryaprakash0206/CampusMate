import { useNavigate } from "react-router-dom";
import logo from "../assets/campusmate.png";
import studentIcon from "../assets/profile.png";
import facultyIcon from "../assets/drives.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-card">

        {/* LEFT PANEL */}
        <div className="home-left">
          <img src={logo} className="home-logo" alt="Campus Mate" />
          <h1>Campus Mate</h1>
          <p>Your complete campus companion</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="home-right">
          <h2>Choose your role</h2>
          <p className="subtitle">
            Select how you'd like to access Campus Mate
          </p>

          <div
            className="role-card student-role"
            onClick={() => navigate("/student")}
          >
            <img src={studentIcon} alt="" />
            <div>
              <h3>Student Login</h3>
              <p>Access courses, exams and campus updates</p>
            </div>
          </div>

          <div
            className="role-card faculty-role"
            onClick={() => navigate("/faculty")}
          >
            <img src={facultyIcon} alt="" />
            <div>
              <h3>Faculty Login</h3>
              <p>Manage classes, students and resources</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
