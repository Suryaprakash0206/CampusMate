import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaClock, FaTimes, FaPlus, FaBullhorn } from "react-icons/fa";

export default function FacultyAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error("Error fetching Announcements:", err));
  }, []);

  const handlePublish = async () => {
    if (!formData.title || !formData.description) return;

    if (editingId) {
      setAnnouncements(
        announcements.map((item) =>
          item._id === editingId
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/faculty/announcement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            facultyId: "FAC001",
            facultyName: "Faculty"
          })
        });
        const data = await response.json();
        setAnnouncements([data, ...announcements]);
      } catch (err) {
        console.error("Error adding announcement:", err);
      }
    }

    setFormData({ title: "", description: "" });
    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/faculty/announcement/${id}`, { method: "DELETE" });
      setAnnouncements(announcements.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
    });
    setEditingId(item._id);
    setShowModal(true);
  };

  return (
    <div className="faculty-announcements">
      <div className="announcements-header">
        <h2>Announcements</h2>

        <button
          className="add-announcement-btn"
          onClick={() => {
            setFormData({ title: "", description: "" });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Announcement
        </button>
      </div>

      {/* Announcement List */}
      {announcements.length === 0 ? (
        <div className="empty-announcements">
          <FaBullhorn />
          <h3>No announcements yet</h3>
          <p>Click "Add Announcement" to create one.</p>
        </div>
      ) : (
        announcements.map((item) => (
          <div key={item._id} className="faculty-announcement-card">
            <div className="announcement-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="announcement-time">
                <FaClock /> {item.createdAt ? new Date(item.createdAt).toLocaleString() : new Date().toLocaleString()}
              </div>
            </div>

            <div className="announcement-actions">
              <FaEdit
                className="edit-icon"
                onClick={() => handleEdit(item)}
              />
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))
      )}


      {/* Modal */}
      {showModal && (
        <div className="announcement-modal-overlay">
          <div className="announcement-modal">
            <div className="modal-header">
              <h3>
                {editingId ? "Edit Announcement" : "New Announcement"}
              </h3>
              <FaTimes onClick={() => setShowModal(false)} />
            </div>

            <label>Title</label>
            <input
              type="text"
              placeholder="Announcement title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              placeholder="Write your announcement details..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <button
              className="publish-btn"
              onClick={handlePublish}
            >
              {editingId ? "Update Announcement" : "Publish Announcement"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
