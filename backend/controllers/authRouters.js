// backend/controllers/authRouters.js
import express from "express";
import Student from "../models/students.js";
import Faculty from "../models/faculty.js"; // Ensure this file exists in models folder!

const router = express.Router();

// Logic for Student
router.post('/student/login', async (req, res) => {
    const { roll, password } = req.body;
    try {
        const student = await Student.findOne({ roll, password });
        if (student) return res.status(200).json({ success: true, message: "Welcome Student" });
        res.status(401).json({ success: false, message: "Invalid Student Credentials" });
    } catch (err) { res.status(500).send(err); }
});

// Logic for Faculty
router.post('/faculty/login', async (req, res) => {
    const { Emp_id, password } = req.body;
    try {
        const faculty = await Faculty.findOne({ Emp_id, password });
        if (faculty) return res.status(200).json({ success: true, message: "Welcome Faculty" });
        res.status(401).json({ success: false, message: "Invalid Faculty Credentials" });
    } catch (err) { res.status(500).send(err); }
});

export default router;