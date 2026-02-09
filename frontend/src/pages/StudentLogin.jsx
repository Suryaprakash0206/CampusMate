import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); 

    if (!studentId || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard/student");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Cannot connect to server. Is the backend running?");
    }
  };

  return (
    <div className="login" style={{ padding: "20px", textAlign: "center" }}>
      <div className="box" style={{ border: "1px solid #ccc", display: "inline-block", padding: "20px" }}>
        <h2>Student Login</h2>
        <div style={{ marginBottom: "10px" }}>
            <input
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
        </div>
        <div style={{ marginBottom: "10px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}