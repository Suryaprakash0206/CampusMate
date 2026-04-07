import express from 'express';
import Faculty from '../models/faculty.js';
import FacultyAnnouncement from "../models/FacultyAnnouncement.js"; // Standardized import
import Hackathon from "../models/Hackathon.js";

const router = express.Router();

// GET: All faculty (for Admin Users page)
router.get('/all', async (req, res) => {
    try {
        const faculty = await Faculty.find({}, '-password');
        res.status(200).json(faculty);
    } catch (err) {
        res.status(500).json({ message: "Error fetching faculty", error: err.message });
    }
});

/* ======================
   FACULTY LOGIN
====================== */
router.post('/login', async (req, res) => {
  const { facultyId, password } = req.body;

  try {
    const faculty = await Faculty.findOne({ facultyId });

    if (!faculty || faculty.password !== password) {
      return res.status(401).json({ message: "Invalid Faculty ID or Password" });
    }

    res.status(200).json({
      message: "Login successful",
      facultyName: faculty.fullName,
      facultyId: faculty.facultyId,
      token: "faculty_sample_token"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   GET FACULTY PROFILE
====================== */
router.get('/profile/:facultyId', async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ facultyId: req.params.facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    // Send back relevant details (exclude password)
    res.status(200).json({
      facultyId: faculty.facultyId,
      fullName: faculty.fullName,
      email: faculty.email,
      phoneNumber: faculty.phoneNumber,
      department: faculty.department
    });
  } catch (err) {
    console.error("Error fetching faculty profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   UPDATE FACULTY PROFILE
====================== */
router.put('/profile/:facultyId', async (req, res) => {
  const { fullName, email, phoneNumber, department } = req.body;
  try {
    const faculty = await Faculty.findOne({ facultyId: req.params.facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if (fullName) faculty.fullName = fullName;
    if (email) faculty.email = email;
    if (phoneNumber) faculty.phoneNumber = phoneNumber;
    if (department) faculty.department = department;

    await faculty.save();

    res.status(200).json({
      message: "Profile updated successfully",
      facultyId: faculty.facultyId,
      fullName: faculty.fullName,
      email: faculty.email,
      phoneNumber: faculty.phoneNumber,
      department: faculty.department
    });
  } catch (err) {
    console.error("Error updating faculty profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   CHANGE PASSWORD
====================== */
router.put('/change-password', async (req, res) => {
  const { facultyId, currentPassword, newPassword } = req.body;

  try {
    const faculty = await Faculty.findOne({ facultyId });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if (faculty.password !== currentPassword) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    faculty.password = newPassword;
    await faculty.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   GET ALL ANNOUNCEMENTS
====================== */
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await FacultyAnnouncement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   ADD ANNOUNCEMENT
====================== */
router.post('/announcement', async (req, res) => {
  try {
    const announcement = new FacultyAnnouncement({
      title: req.body.title,
      description: req.body.description,
      facultyId: req.body.facultyId, // Match your model fields
      facultyName: req.body.facultyName || "Faculty"
    });

    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   DELETE ANNOUNCEMENT
====================== */
router.delete('/announcement/:id', async (req, res) => {
  try {
    // FIX: Changed 'Announcement' to 'FacultyAnnouncement'
    await FacultyAnnouncement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   HACKATHON ROUTES
====================== */

// GET: All hackathons
router.get("/hackathons", async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });
    res.status(200).json(hackathons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a new hackathon
router.post("/add-hackathon", async (req, res) => {
  try {
    const newHackathon = new Hackathon(req.body);
    await newHackathon.save();
    res.status(201).json({ message: "Hackathon Added Successfully!", hackathon: newHackathon });
  } catch (err) {
    res.status(500).json({ message: "Error saving hackathon", error: err.message });
  }
});

// DELETE: Remove a hackathon
router.delete("/hackathon/:id", async (req, res) => {
  try {
    await Hackathon.findByIdAndDelete(req.params.id);
    res.json({ message: "Hackathon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   PERMISSION ROUTES (FACULTY)
====================== */

// GET: All permissions requests
router.get("/permissions", async (req, res) => {
  try {
    const { default: Permission } = await import("../models/Permission.js");
    const permissions = await Permission.find().sort({ submitted: -1 });
    res.status(200).json(permissions);
  } catch (err) {
    console.error("Error fetching all permissions:", err);
    res.status(500).json({ message: "Error fetching permissions", error: err.message });
  }
});

// PUT: Update permission status
router.put("/permissions/:id", async (req, res) => {
  const { status } = req.body;
  try {
    if (!["Approved", "Denied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }
    const { default: Permission } = await import("../models/Permission.js");
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedPermission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: `Permission ${status.toLowerCase()}`, permission: updatedPermission });
  } catch (err) {
    console.error("Error updating permission status:", err);
    res.status(500).json({ message: "Error updating permission status", error: err.message });
  }
});

/* ======================
   EXAM ROUTES (FACULTY)
====================== */

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

/* ======================
   DRIVE ROUTES (FACULTY)
====================== */

// GET: All drives
router.get("/drives", async (req, res) => {
  try {
    const { default: Drive } = await import("../models/Drive.js");
    const drives = await Drive.find().sort({ createdAt: -1 });
    res.status(200).json(drives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a new drive
router.post("/add-drive", async (req, res) => {
  try {
    const { default: Drive } = await import("../models/Drive.js");
    const newDrive = new Drive(req.body);
    await newDrive.save();
    res.status(201).json({ message: "Drive Added Successfully!", drive: newDrive });
  } catch (err) {
    res.status(500).json({ message: "Error saving drive", error: err.message });
  }
});

// PUT: Edit a drive
router.put("/drives/:id", async (req, res) => {
  try {
    const { default: Drive } = await import("../models/Drive.js");
    const updatedDrive = await Drive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Drive updated successfully", drive: updatedDrive });
  } catch (err) {
    res.status(500).json({ message: "Error updating drive", error: err.message });
  }
});

// DELETE: Remove a drive
router.delete("/drives/:id", async (req, res) => {
  try {
    const { default: Drive } = await import("../models/Drive.js");
    await Drive.findByIdAndDelete(req.params.id);
    res.json({ message: "Drive deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   TIMETABLE & SYLLABUS (FACULTY)
====================== */
router.get("/timetable", async (req, res) => {
  try {
    const { default: Timetable } = await import("../models/Timetable.js");
    const timetable = await Timetable.find({ role: "faculty" });
    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/syllabus", async (req, res) => {
  try {
    const { default: Syllabus } = await import("../models/Syllabus.js");
    const syllabus = await Syllabus.find({ role: "faculty" });
    res.status(200).json(syllabus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
