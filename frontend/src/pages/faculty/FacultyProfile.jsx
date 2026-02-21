import { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData] = useState({
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    phone: "+1 234 567 8900",
    department: "Computer Science",
  });

  return (
    <div className="profile-page">
      <h2 className="profile-heading">Profile</h2>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-title">
            <h3>Personal Information</h3>
            <p>Profile details</p>
          </div>
        </div>

        <div className="profile-fields">
          <label>Full Name</label>
          <input name="name" value={formData.name} disabled />

          <label>Email</label>
          <input name="email" value={formData.email} disabled />

          <label>Phone Number</label>
          <input name="phone" value={formData.phone} disabled />

          <label>Department</label>
          <input name="department" value={formData.department} disabled />
        </div>
      </div>

      {/* Change Password Button */}
      <div className="change-password-wrapper">
        <button
          className="change-password-btn"
          onClick={() => setShowPassword(true)}
        >
          <FiLock className="lock-icon" />
          Change Password
        </button>
      </div>

      {/* Modal */}
      {showPassword && (
        <div className="modal-overlay">
          <div className="password-modal">
            <div className="modal-header">
              <h3>Change Password</h3>
              <span onClick={() => setShowPassword(false)}>×</span>
            </div>

            <p className="modal-sub">
              Enter your current password and choose a new one.
            </p>

            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />

            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />

            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" />

            <button className="update-btn">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
