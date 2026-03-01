import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Exam", examSchema);
