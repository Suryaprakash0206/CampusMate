import express from 'express';
import Admin from '../models/admin.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { adminId, password } = req.body;

    try {
        const admin = await Admin.findOne({ adminId });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: "Invalid Admin ID or Password" });
        }

        res.status(200).json({
            message: "Admin Login successful",
            adminId: admin.adminId,
            token: "sample_admin_jwt_token" 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ======================
   ADMIN PROFILE
====================== */

// GET: Fetch admin profile
router.get("/profile/:adminId", async (req, res) => {
    try {
        const admin = await Admin.findOne({ adminId: req.params.adminId }, '-password');
        if (!admin) return res.status(404).json({ message: "Admin not found" });
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
});

// PUT: Update admin profile
router.put("/profile/:adminId", async (req, res) => {
    try {
        const { fullName, email, phoneNumber, department } = req.body;
        const admin = await Admin.findOneAndUpdate(
            { adminId: req.params.adminId },
            { fullName, email, phoneNumber, department },
            { new: true, runValidators: true }
        );
        if (!admin) return res.status(404).json({ message: "Admin not found" });
        res.status(200).json({ message: "Profile updated successfully", admin });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
});

// PUT: Change admin password
router.put("/change-password", async (req, res) => {
    try {
        const { adminId, currentPassword, newPassword } = req.body;
        const admin = await Admin.findOne({ adminId });

        if (!admin) return res.status(404).json({ message: "Admin not found" });
        if (admin.password !== currentPassword) {
            return res.status(401).json({ message: "Current password is incorrect." });
        }

        admin.password = newPassword;
        await admin.save();
        res.status(200).json({ message: "Password changed successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error changing password", error: err.message });
    }
});

/* ==================
   EXAM ROUTES (ADMIN)
   ================== */

// GET: All exams
router.get("/exams", async (req, res) => {
    try {
        const { default: Exam } = await import("../models/Exam.js");
        const exams = await Exam.find().sort({ date: 1 });
        res.status(200).json(exams);
    } catch (err) {
        console.error("Error fetching exams:", err);
        res.status(500).json({ message: "Error fetching exams", error: err.message });
    }
});

// POST: Add new exam
router.post("/exams", async (req, res) => {
    try {
        const { default: Exam } = await import("../models/Exam.js");
        const newExam = new Exam(req.body);
        await newExam.save();
        res.status(201).json({ message: "Exam created successfully", exam: newExam });
    } catch (err) {
        console.error("Error creating exam:", err);
        res.status(500).json({ message: "Error creating exam", error: err.message });
    }
});

// DELETE: Remove an exam
router.delete("/exams/:id", async (req, res) => {
    try {
        const { default: Exam } = await import("../models/Exam.js");
        await Exam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Exam deleted successfully" });
    } catch (err) {
        console.error("Error deleting exam:", err);
        res.status(500).json({ message: "Error deleting exam", error: err.message });
    }
});
/* ======================
   TIMETABLE ROUTES (ADMIN)
====================== */

// GET: All timetable entries (optionally filter by ?role=student or ?role=faculty)
router.get("/timetable", async (req, res) => {
    try {
        const { default: Timetable } = await import("../models/Timetable.js");
        const filter = req.query.role ? { role: req.query.role } : {};
        const entries = await Timetable.find(filter);
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: "Error fetching timetable", error: err.message });
    }
});

// POST: Add a new timetable entry
router.post("/timetable", async (req, res) => {
    try {
        const { default: Timetable } = await import("../models/Timetable.js");
        const newEntry = new Timetable(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ message: "Error adding timetable entry", error: err.message });
    }
});

// DELETE: Remove a timetable entry
router.delete("/timetable/:id", async (req, res) => {
    try {
        const { default: Timetable } = await import("../models/Timetable.js");
        await Timetable.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Timetable entry deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting timetable entry", error: err.message });
    }
});

/* ======================
   SYLLABUS ROUTES (ADMIN)
====================== */

// GET: All syllabus entries (optionally filter by ?role=student or ?role=faculty)
router.get("/syllabus", async (req, res) => {
    try {
        const { default: Syllabus } = await import("../models/Syllabus.js");
        const filter = req.query.role ? { role: req.query.role } : {};
        const entries = await Syllabus.find(filter);
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: "Error fetching syllabus", error: err.message });
    }
});

// POST: Add a new syllabus entry
router.post("/syllabus", async (req, res) => {
    try {
        const { default: Syllabus } = await import("../models/Syllabus.js");
        const newEntry = new Syllabus(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ message: "Error adding syllabus entry", error: err.message });
    }
});

// DELETE: Remove a syllabus entry
router.delete("/syllabus/:id", async (req, res) => {
    try {
        const { default: Syllabus } = await import("../models/Syllabus.js");
        await Syllabus.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Syllabus entry deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting syllabus entry", error: err.message });
    }
});

export default router;
