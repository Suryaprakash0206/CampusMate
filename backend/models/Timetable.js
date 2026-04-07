import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['student', 'faculty'] },
  day: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  room: { type: String, required: true }
});

export default mongoose.model("Timetable", timetableSchema);
