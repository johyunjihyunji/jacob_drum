import { ArrowUp, CalendarDays, Drum, Video, Camera, Mail } from "lucide-react";
import siteConfig from "../siteConfig";

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function Header({ onNavClick }) {
  const iconStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "color 0.15s",
  };

  const handleMouseEnter = (e) => { e.currentTarget.style.color = "#FFAE3D"; };
  const handleMouseLeave = (e) => { e.currentTarget.style.color = "#666"; };

  return (
    <header className="site-header" style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0.75rem 2rem", background: "#F9F9F6",
    }}>
      <button
        onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); window.history.pushState(null, "", window.location.pathname); }}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontFamily: "'Azeret Mono', monospace", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1a1a" }}>
          {siteConfig.name}
        </h1>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {siteConfig.title}
        </p>
      </button>

      <nav className="nav-sidebar">

        <button className="nav-icon" data-tooltip="Top" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); window.history.pushState(null, "", window.location.pathname); }} style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ArrowUp size={22} />
        </button>

        <button className="nav-icon" data-tooltip="Shows" onClick={() => onNavClick("shows")} style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <CalendarDays size={22} />
        </button>

        <button className="nav-icon" data-tooltip="About" onClick={() => onNavClick("about")} style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Drum size={22} />
        </button>

        <button className="nav-icon" data-tooltip="Videos" onClick={() => onNavClick("videos")} style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Video size={22} />
        </button>

        <button className="nav-icon" data-tooltip="Photos" onClick={() => onNavClick("photos")} style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Camera size={22} />
        </button>

        <button className="nav-icon" data-tooltip="Contact" onClick={() => onNavClick("contact")} style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Mail size={22} />
        </button>

        {siteConfig.socials.instagram && (
          <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer"
            className="nav-icon" data-tooltip="Instagram"
            style={{ ...iconStyle, textDecoration: "none" }}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <InstagramIcon size={22} />
          </a>
        )}
      </nav>
    </header>
  );
}
