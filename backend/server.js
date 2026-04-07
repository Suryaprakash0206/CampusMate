// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// // import authRouter from './controllers/authRouters.js';
// import studentRoutes from './routes/studentRoutes.js';
// import facultyRoutes from './routes/facultyRoutes.js';


// const app = express();

// // 1. Middleware (CORS must allow your frontend port, usually 5173 for Vite)
// app.use(cors()); 
// app.use(express.json());

// // 2. Health Check (Open http://localhost:5000/ in your browser to test)
// app.get('/', (req, res) => res.send("Backend is running!"));

// // 3. Database Connection
// mongoose.connect('mongodb://localhost:27017/campusLogindb')
//   .then(() => console.log("Connected to MongoDB Compass"))
//   .catch(err => console.error("Connection error:", err));

// // 4. Routes
// app.use('/api/student', studentRoutes); 
// app.use('/api/faculty', facultyRoutes); 

// // 5. Port (Make sure this matches your frontend fetch call)
// const PORT = 5000; 
// app.listen(PORT, () => console.log(`Server is live on http://localhost:${PORT}`));


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Admin from './models/admin.js';
import Student from './models/students.js';
import Faculty from './models/faculty.js';
import Timetable from './models/Timetable.js';
import Syllabus from './models/Syllabus.js';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Backend is running!");
});

mongoose.connect('mongodb://127.0.0.1:27017/campusLogindb')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  
  try {
    // Seed default admin if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        adminId: "admin",
        password: "admin123"
      });
      await defaultAdmin.save();
      console.log("✅ Default admin seeded (admin/admin123)");
    }

    // Seed default student if none exists
    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      const defaultStudent = new Student({
        studentId: "student123",
        fullName: "Vijay",
        email: "student@example.com",
        phoneNumber: "9876543210",
        department: "Computer Science",
        password: "password"
      });
      await defaultStudent.save();
      console.log("✅ Default student seeded (student123/password)");
    }

    // Seed default faculty if none exists
    const facultyCount = await Faculty.countDocuments();
    if (facultyCount === 0) {
      const defaultFaculty = new Faculty({
        facultyId: "faculty123",
        fullName: "Dr. Smith",
        email: "faculty@example.com",
        phoneNumber: "1234567890",
        department: "Computer Science",
        password: "password"
      });
      await defaultFaculty.save();
      console.log("✅ Default faculty seeded (faculty123/password)");
    }

    // Seed Timetable and Syllabus if empty
    const timetableCount = await Timetable.countDocuments();
    if (timetableCount === 0) {
      const ttEntries = [
        { role: "student", day: "Monday", time: "9:00 AM", subject: "Mathematics", room: "A101" },
        { role: "student", day: "Tuesday", time: "10:00 AM", subject: "Physics", room: "B202" },
        { role: "student", day: "Wednesday", time: "11:00 AM", subject: "Chemistry", room: "Lab 1" },
        { role: "student", day: "Thursday", time: "2:00 PM", subject: "Computer Science", room: "Lab 2" },
        { role: "student", day: "Friday", time: "10:30 AM", subject: "English", room: "D405" },

        { role: "faculty", day: "Monday", time: "8:00 AM", subject: "Data Structures", room: "C301" },
        { role: "faculty", day: "Tuesday", time: "11:00 AM", subject: "Database Systems", room: "C301" },
        { role: "faculty", day: "Thursday", time: "2:00 PM", subject: "Algorithms", room: "C302" },
        { role: "faculty", day: "Friday", time: "9:00 AM", subject: "Data Structures Lab", room: "Lab 3" },
      ];
      await Timetable.insertMany(ttEntries);
      console.log("✅ Default Timetable seeded");
    }

    const syllabusCount = await Syllabus.countDocuments();
    if (syllabusCount === 0) {
      const sylEntries = [
        { role: "student", subject: "Mathematics", semester: "3rd", credits: 4, description: "Calculus, Differential Equations, Linear Algebra" },
        { role: "student", subject: "Physics", semester: "1st", credits: 3, description: "Mechanics, Waves, Optics, Thermodynamics" },
        { role: "student", subject: "Chemistry", semester: "1st", credits: 3, description: "Organic Chemistry, Reactions, Polymers" },
        { role: "student", subject: "Computer Science", semester: "3rd", credits: 4, description: "Data Structures, Algorithms, Databases" },
        
        { role: "faculty", subject: "Data Structures", semester: "3rd", credits: 4, description: "Arrays, Linked Lists, Trees, Graphs, Algorithms" },
        { role: "faculty", subject: "Database Systems", semester: "4th", credits: 3, description: "SQL, ER Diagrams, Normalization, Transactions" },
        { role: "faculty", subject: "Algorithms", semester: "3rd", credits: 3, description: "Sorting, Searching, Dynamic Programming" },
      ];
      await Syllabus.insertMany(sylEntries);
      console.log("✅ Default Syllabus seeded");
    }
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
});
