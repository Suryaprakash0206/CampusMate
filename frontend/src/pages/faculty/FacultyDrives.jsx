import { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaTimes,
  FaPlus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBriefcase,
  FaUserGraduate,
  FaExternalLinkAlt
} from "react-icons/fa";

export default function FacultyDrives() {
  const [drives, setDrives] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    date: "",
    venue: "",
    eligibility: "",
    link: "",
    status: "Upcoming"
  });

  const handlePublish = () => {
    if (!formData.company || !formData.role) return;

    if (editingId) {
      setDrives(
        drives.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
    } else {
      const newDrive = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toLocaleString()
      };

      setDrives([newDrive, ...drives]);
    }

    setFormData({
      company: "",
      role: "",
      date: "",
      venue: "",
      eligibility: "",
      link: "",
      status: "Upcoming"
    });

    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setDrives(drives.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  return (
    <div className="drives-page">

      {/* Header */}
      <div className="drives-header">
        <h2>Placement Drives</h2>
        <button
          className="add-drive-btn"
          onClick={() => {
            setEditingId(null);
            setFormData({
              company: "",
              role: "",
              date: "",
              venue: "",
              eligibility: "",
              link: "",
              status: "Upcoming"
            });
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Drive
        </button>
      </div>

      {/* Empty State */}
      {drives.length === 0 ? (
        <div className="drives-empty">
          <FaBriefcase />
          <h3>No drives yet</h3>
          <p>Click "Add Drive" to create one.</p>
        </div>
      ) : (
        <div className="drives-grid">
          {drives.map((item) => (
        <div key={item.id} className="drive-card">

        {/* Card Content */}
        <div className="drive-content">
        <h3>{item.company}</h3>
        <p className="drive-role">{item.role}</p>

        <div className="drive-info">

        <div className="drive-row">
          <span className="drive-value">
            <FaCalendarAlt className="drive-icon" />
            <span className="drive-label">Deadline: </span>
            {item.date}
          </span>
        </div>

        <div className="drive-row">
          <span className="drive-value">
            <FaMapMarkerAlt className="drive-icon" />
            <span className="drive-label">Venue: </span>
            {item.venue}
          </span>
        </div>

        <div className="drive-row">
          <span className="drive-value">
            <FaUserGraduate className="drive-icon" />
            <span className="drive-label">Eligibility: </span>
            {item.eligibility}
          </span>
        </div>

      <div className="drive-row">
        <span className="drive-label">Created: </span>
        <span className="drive-value">
          {item.createdAt}
        </span>
      </div>

    </div>
  </div>

  {/* Top Right Icons */}
  <div className="drive-actions">

    {item.link && (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="drive-link-icon"
      >
        <FaExternalLinkAlt />
      </a>
    )}

    <FaEdit onClick={() => handleEdit(item)} />
    <FaTrash onClick={() => handleDelete(item.id)} />

  </div>

</div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="drive-modal-overlay">
          <div className="drive-modal">

            <div className="drive-modal-header">
              <h3>{editingId ? "Edit Drive" : "New Drive"}</h3>
              <FaTimes onClick={() => setShowModal(false)} />
            </div>

            <label>Company Name</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />

            <label>Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />

            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <label>Venue</label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
            />

            <label>Eligibility</label>
            <input
              type="text"
              value={formData.eligibility}
              onChange={(e) =>
                setFormData({ ...formData, eligibility: e.target.value })
              }
            />

            <label>Registration Link</label>
            <input
              type="text"
              placeholder="https://company.com/register"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />

            {/* <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option>Upcoming</option>
              <option>Completed</option>
            </select> */}

            <button className="drive-publish-btn" onClick={handlePublish}>
              {editingId ? "Update Drive" : "Add Drive"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
