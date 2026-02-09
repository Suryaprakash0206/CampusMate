import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import authRouter from './controllers/authRouters.js';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';


const app = express();

// 1. Middleware (CORS must allow your frontend port, usually 5173 for Vite)
app.use(cors()); 
app.use(express.json());

// 2. Health Check (Open http://localhost:5000/ in your browser to test)
app.get('/', (req, res) => res.send("Backend is running!"));

// 3. Database Connection
mongoose.connect('mongodb://localhost:27017/campusLogindb')
  .then(() => console.log("Connected to MongoDB Compass"))
  .catch(err => console.error("Connection error:", err));

// 4. Routes
app.use('/api/student', studentRoutes); 
app.use('/api/faculty', facultyRoutes); 

// 5. Port (Make sure this matches your frontend fetch call)
const PORT = 5000; 
app.listen(PORT, () => console.log(`Server is live on http://localhost:${PORT}`));