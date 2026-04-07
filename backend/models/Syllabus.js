import mongoose from 'mongoose';

const syllabusSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['student', 'faculty'] },
  subject: { type: String, required: true },
  semester: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String, required: true }
});

export default mongoose.model("Syllabus", syllabusSchema);
