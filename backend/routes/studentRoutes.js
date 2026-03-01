import express from 'express';
import Student from '../models/students.js'; // Added .js extension and switched to import

const router = express.Router();

// Changed from '/student/login' to '/login' 
// because the prefix '/api/student' is already added in server.js
router.post('/login', async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const student = await Student.findOne({ studentId });

        if (!student || student.password !== password) {
            return res.status(401).json({ message: "Invalid ID or Password" });
        }

        res.status(200).json({
            message: "Login successful",
            studentName: student.fullName,
            studentId: student.studentId,
            token: "sample_jwt_token" // Added a sample token for the frontend to store
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get student profile route
router.get('/profile/:studentId', async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        // Send back all relevant details (exclude password)
        res.status(200).json({
            studentId: student.studentId,
            fullName: student.fullName,
            email: student.email,
            phoneNumber: student.phoneNumber,
            department: student.department
        });
    } catch (err) {
        console.error("Error fetching student profile:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update student profile route
router.put('/profile/:studentId', async (req, res) => {
    const { fullName, email, phoneNumber, department } = req.body;
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (fullName) student.fullName = fullName;
        if (email) student.email = email;
        if (phoneNumber) student.phoneNumber = phoneNumber;
        if (department) student.department = department;

        await student.save();

        res.status(200).json({
            message: "Profile updated successfully",
            studentId: student.studentId,
            fullName: student.fullName,
            email: student.email,
            phoneNumber: student.phoneNumber,
            department: student.department
        });
    } catch (err) {
        console.error("Error updating student profile:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Changed password endpoint
router.put('/change-password', async (req, res) => {
    const { studentId, currentPassword, newPassword } = req.body;

    try {
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (student.password !== currentPassword) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        student.password = newPassword;
        await student.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ======================
   PERMISSION ROUTES (STUDENT)
====================== */

// POST: Add new permission request
router.post('/permissions', async (req, res) => {
    try {
        // Assume req.body contains { studentId, title, fromDate, toDate, reason }
        const { default: Permission } = await import('../models/Permission.js');
        const newPermission = new Permission(req.body);
        await newPermission.save();
        res.status(201).json({ message: "Permission requested successfully", permission: newPermission });
    } catch (err) {
        console.error("Error submitting permission:", err);
        res.status(500).json({ message: "Error submitting permission", error: err.message });
    }
});

// GET: Fetch permissions by studentId
router.get('/permissions/:studentId', async (req, res) => {
    try {
        const { default: Permission } = await import('../models/Permission.js');
        const permissions = await Permission.find({ studentId: req.params.studentId }).sort({ submitted: -1 });
        res.status(200).json(permissions);
    } catch (err) {
        console.error("Error fetching permissions:", err);
        res.status(500).json({ message: "Error fetching permissions", error: err.message });
    }
});

/* ======================
   EXAM ROUTES (STUDENT)
====================== */

// GET: All exams
router.get("/exams", async (req, res) => {
    try {
        const { default: Exam } = await import('../models/Exam.js');
        const exams = await Exam.find().sort({ date: 1 }); // Sort by upcoming date
        res.status(200).json(exams);
    } catch (err) {
        console.error("Error fetching exams:", err);
        res.status(500).json({ message: "Error fetching exams", error: err.message });
    }
});

/* ======================
   DRIVE ROUTES (STUDENT)
====================== */

// GET: All drives
router.get("/drives", async (req, res) => {
    try {
        const { default: Drive } = await import('../models/Drive.js');
        const drives = await Drive.find().sort({ createdAt: -1 });
        res.status(200).json(drives);
    } catch (err) {
        console.error("Error fetching drives:", err);
        res.status(500).json({ message: "Error fetching drives", error: err.message });
    }
});

export default router; // Switched from module.exports to export default
