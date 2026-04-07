import { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBook, FaInfoCircle } from "react-icons/fa";
import "../dashboard-layout.css"; // Using custom beautiful dashboard layout

export default function FacultyHome() {
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [syllabusEntries, setSyllabusEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const ttRes = await axios.get("http://localhost:5000/api/faculty/timetable");
            setTimetableEntries(ttRes.data);
            
            const sylRes = await axios.get("http://localhost:5000/api/faculty/syllabus");
            setSyllabusEntries(sylRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };
    fetchData();
  }, []);
  return (
    <div className="dashboard-home">
       <div className="home-header">
         <h2>Welcome back, Faculty Member!</h2>
         <p>Here is your teaching schedule and syllabus overview for this semester.</p>
       </div>

       <div className="home-split-layout">
         {/* Left Column: Timetable */}
         <div className="home-column timetable-col">
            <h3 className="col-title"><FaCalendarAlt /> My Teaching Timetable</h3>
            <div className="table-wrapper">
                <table className="beautiful-table">
                  <thead>
                     <tr>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Course</th>
                        <th>Room</th>
                     </tr>
                  </thead>
                  <tbody>
                     {timetableEntries.map((entry, idx) => (
                        <tr key={idx}>
                           <td className="fw-bold">{entry.day}</td>
                           <td><span className="badge-time"><FaClock/> {entry.time}</span></td>
                           <td>{entry.subject}</td>
                           <td><FaMapMarkerAlt className="text-muted"/> {entry.room}</td>
                        </tr>
                     ))}
                  </tbody>
                </table>
            </div>
         </div>

         {/* Right Column: Syllabus */}
         <div className="home-column syllabus-col">
            <h3 className="col-title"><FaBook /> Assigned Courses Syllabus</h3>
            <div className="syllabus-scroll">
               {syllabusEntries.map((item, idx) => (
                  <div key={idx} className="beautiful-card">
                     <div className="card-header">
                        <h4>{item.subject}</h4>
                        <span className="badge-semester">Sem {item.semester}</span>
                     </div>
                     <p>{item.description}</p>
                     <div className="card-footer">
                        <FaInfoCircle /> {item.credits} Credits
                     </div>
                  </div>
               ))}
            </div>
         </div>
       </div>
    </div>
  );
}
