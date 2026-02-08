// StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!studentId && !password) {
      setError("Student ID and Password are required");
    } else if (!studentId) {
      setError("Student ID is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      setError("");
      navigate("/dashboard/student");
    }
  };

  return (
    <div className="login">
      <div className="box">
        <h2>Student Login</h2>

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
