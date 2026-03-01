import mongoose from "mongoose";

const driveSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  status: {
    type: String,
    default: "Upcoming",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Drive", driveSchema);
