import { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaClock,
  FaTimes,
  FaPlus,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaCode
} from "react-icons/fa";

export default function FacultyHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    place: "",
    deadline: "",
    link: ""
  });

  const handlePublish = () => {
    if (!formData.title || !formData.company) return;

    if (editingId) {
      setHackathons(
        hackathons.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
    } else {
      const newHackathon = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toLocaleString()
      };

      setHackathons([newHackathon, ...hackathons]);
    }

    setFormData({
      title: "",
      company: "",
      place: "",
      deadline: "",
      link: ""
    });

    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setHackathons(hackathons.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      company: item.company,
      place: item.place,
      deadline: item.deadline,
      link: item.link
    });

    setEditingId(item.id);
    setShowModal(true);
  };

  return (
    <div className="faculty-announcements">
      {/* Header */}
      <div className="announcements-header">
        <h2>Hackathons</h2>

        <button
          className="add-announcement-btn"
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "",
              company: "",
              place: "",
              deadline: "",
              link: ""
            });
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Hackathon
        </button>
      </div>

      {/* List */}
      {hackathons.length === 0 ? (
        <div className="empty-hackathons">
          <FaCode />
          <h3>No hackathons yet</h3>
          <p>Click "Add Hackathon" to create one.</p>
        </div>
      ) : (
        <div className="hackathon-grid">
          {hackathons.map((item) => (
            <div key={item.id} className="hackathon-card">
              <div className="hackathon-content">
                <h3>{item.title}</h3>
                <p className="hackathon-company">{item.company}</p>

                <div className="hackathon-info">
                  <div>
                    <FaClock className="info-icon" />
                    Deadline: {item.deadline}
                  </div>

                  <div>
                    <FaMapMarkerAlt className="info-icon" />
                    {item.place}
                  </div>

                  <div>
                    <FaClock className="info-icon" />
                    {item.createdAt}
                  </div>
                </div>
              </div>

              <div className="hackathon-actions">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
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
        <div className="announcement-modal-overlay">
          <div className="announcement-modal">
            <div className="modal-header">
              <h3>
                {editingId ? "Edit Hackathon" : "New Hackathon"}
              </h3>
              <FaTimes onClick={() => setShowModal(false)} />
            </div>

            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Google Summer Internship 2026"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <label>Company Name</label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />

            <label>Place</label>
            <input
              type="text"
              placeholder="e.g. Bangalore, India"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
            />

            <label>Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />

            <label>Registration Link</label>
            <input
              type="text"
              placeholder="https://hackathon.example.com/register"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />

            <button
              className="publish-btn"
              onClick={handlePublish}
            >
              {editingId ? "Update Hackathon" : "Add Hackathon"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
