import express from 'express';
import Faculty from '../models/faculty.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { facultyId, password } = req.body;

    try {
        const faculty = await Faculty.findOne({ facultyId });

        if (!faculty || faculty.password !== password) {
            return res.status(401).json({ message: "Invalid Faculty ID or Password" });
        }

        res.status(200).json({ 
            message: "Login successful", 
            facultyName: faculty.name,
            token: "faculty_sample_token" 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;