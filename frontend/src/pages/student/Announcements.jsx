import { FiClock } from "react-icons/fi";

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "Mid-Term Schedule",
      description:
        "Mid term schedule is released. So start preparing for your exams. All The Best.",
      date: "2/20/2026, 9:44:54 PM",
    },
  ];

  return (
    <div className="announcements-page">
      <h2 className="announcements-heading">Announcements</h2>

      {announcements.map((item) => (
        <div key={item.id} className="student-announcement-card">
          <h3 className="announcement-title">{item.title}</h3>

          <p className="announcement-description">
            {item.description}
          </p>

          <div className="announcement-time">
            <FiClock className="clock-icon" />
            <span>{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
