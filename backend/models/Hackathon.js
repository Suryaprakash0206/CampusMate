import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  place: { type: String, required: true },
  deadline: { type: String, required: true },
  registrationLink: { type: String, required: true },
  facultyName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Hackathon", hackathonSchema);
