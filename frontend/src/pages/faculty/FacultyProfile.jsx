import { useState, useEffect } from "react";
import { FiLock, FiEdit, FiSave } from "react-icons/fi";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  const [formData, setFormData] = useState({
    name: "Loading...",
    email: "Loading...",
    phone: "Loading...",
    department: "Loading...",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const facultyId = localStorage.getItem("facultyId");
      if (!facultyId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/faculty/profile/${facultyId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.fullName || "Not Specified",
            email: data.email || "Not Specified",
            phone: data.phoneNumber || "Not Specified",
            department: data.department || "Not Specified",
          });
        } else {
          console.error("Failed to fetch profile");
          setFormData({
            name: "Error loading data",
            email: "Error loading data",
            phone: "Error loading data",
            department: "Error loading data",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setProfileMessage("");
    setProfileError("");
    const facultyId = localStorage.getItem("facultyId");

    if (!facultyId) {
      setProfileError("Not logged in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/faculty/profile/${facultyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          department: formData.department
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setProfileMessage(data.message);
        setIsEditing(false);
      } else {
        setProfileError(data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setProfileError("Server error. Try again later.");
    }
  };

  const handlePasswordChange = async () => {
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const facultyId = localStorage.getItem("facultyId");
    if (!facultyId) {
      setError("Not logged in. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/faculty/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPassword(false);
          setMessage("");
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-heading">Profile</h2>

      <div className="profile-card">
        {profileMessage && <p style={{ color: "green", fontSize: "14px", marginBottom: "10px", textAlign: "center" }}>{profileMessage}</p>}
        {profileError && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px", textAlign: "center" }}>{profileError}</p>}

        <div className="profile-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="profile-title">
            <h3>Personal Information</h3>
            <p>Profile details</p>
          </div>
          <div
            className="edit-profile-icon"
            onClick={() => {
              if (isEditing) handleSaveProfile();
              else setIsEditing(true);
            }}
            style={{
              color: "#10b981",
              cursor: "pointer",
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s"
            }}
            title={isEditing ? "Save Profile" : "Edit Profile"}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {isEditing ? <FiSave /> : <FiEdit />}
          </div>
        </div>

        <div className="profile-fields">
          <label>Full Name</label>
          <input name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />

          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} />

          <label>Phone Number</label>
          <input name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} />

          <label>Department</label>
          <input name="department" value={formData.department} onChange={handleInputChange} disabled={!isEditing} />
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

            {message && <p style={{ color: "green", fontSize: "14px", marginBottom: "10px" }}>{message}</p>}
            {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="update-btn" onClick={handlePasswordChange}>
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
