import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <h2 className="nav-title">Monks Event</h2>

        <button
          className="nav-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
