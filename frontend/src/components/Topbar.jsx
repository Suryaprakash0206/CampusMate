import logo from "../assets/campusmate.png"; // ✅ Campus Mate logo

export default function Topbar() {
  return (
    <div className="topbar">
      <img src={logo} alt="Campus Mate Logo" className="topbar-logo" />
      <span className="topbar-title">CAMPUS MATE</span>
    </div>
  );
}
