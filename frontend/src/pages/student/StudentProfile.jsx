import { useState } from "react";

export default function StudentProfile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="profile-page">
      <h1>Student Profile</h1>

      <div className="profile-card">
        <p><strong>ID:</strong> STU001</p>
        <p><strong>Email:</strong> STU001@gmail.com</p>
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
