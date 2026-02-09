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
            studentName: student.name,
            token: "sample_jwt_token" // Added a sample token for the frontend to store
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router; // Switched from module.exports to export default