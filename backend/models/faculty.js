import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
});

export default mongoose.model("Faculty", facultySchema);