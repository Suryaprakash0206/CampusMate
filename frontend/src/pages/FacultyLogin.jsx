import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyLogin() {
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role") === "faculty") {
      navigate("/dashboard/faculty", { replace: true });
    }
  }, []);

  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!facultyId || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/faculty/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("facultyId", data.facultyId);
        localStorage.setItem("role", "faculty");
        navigate("/dashboard/faculty");
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
      <div
        className="box"
        style={{
          border: "1px solid #ccc",
          display: "inline-block",
          padding: "20px",
        }}
      >
        <h2>Faculty Login</h2>

        {/* Faculty ID */}
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Faculty ID"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                passwordRef.current.focus();
              }
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        )}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
