import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  department: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model("Faculty", facultySchema);
