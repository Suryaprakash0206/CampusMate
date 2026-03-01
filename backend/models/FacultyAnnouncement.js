import mongoose from "mongoose";

const facultyAnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  facultyId: { type: String, required: true },
  facultyName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model(
  "FacultyAnnouncement",
  facultyAnnouncementSchema
);
