import { useState } from "react";

export default function FacultyProfile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="profile-page">
      <h1>Faculty Profile</h1>

      <div className="profile-card">
        <p><strong>ID:</strong> FAC001</p>
        <p><strong>Email:</strong> FAC001@gmail.com</p>
      </div>

      <button
        className="change-password-btn"
        onClick={() => setShowPassword(!showPassword)}
      >
        Change Password
      </button>

      {showPassword && (
        <div className="password-box">
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
          <button>Update Password</button>
        </div>
      )}
    </div>
  );
}
