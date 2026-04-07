import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, default: "Admin" },
  email: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  department: { type: String, default: "Administration" }
});

export default mongoose.model("Admin", adminSchema);
