// FacultyLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyLogin() {
  const navigate = useNavigate();
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!facultyId && !password) {
      setError("Faculty ID and Password are required");
    } else if (!facultyId) {
      setError("Faculty ID is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      setError("");
      navigate("/dashboard/faculty");
    }
  };

  return (
    <div className="login">
      <div className="box">
        <h2>Faculty Login</h2>

        <input
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
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
