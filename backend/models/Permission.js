import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    title: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Approved", "Denied"]
    },
    submitted: {
        type: String,
        default: () => new Date().toISOString().split("T")[0]
    }
});

export default mongoose.model("Permission", permissionSchema);
