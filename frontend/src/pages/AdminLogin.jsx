import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    const passwordRef = useRef(null);

    useEffect(() => {
      if (localStorage.getItem("token") && localStorage.getItem("role") === "admin") {
        navigate("/dashboard/admin", { replace: true });
      }
    }, []);

    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        if (!adminId || !password) {
            setError("Please fill in all fields");
            return;
        }

        // ✅ Demo mode — works without a backend
        if (adminId === "admin" && password === "admin123") {
            localStorage.setItem("adminId", "admin");
            localStorage.setItem("role", "admin");
            navigate("/dashboard/admin");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("adminId", data.adminId || adminId);
                localStorage.setItem("role", "admin");
                navigate("/dashboard/admin");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Server unavailable. Use Admin ID: admin / Password: admin123 to preview.");
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
                <h2>Admin Login</h2>

                {/* Admin ID */}
                <div style={{ marginBottom: "10px" }}>
                    <input
                        placeholder="Admin ID"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
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
