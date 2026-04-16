import { useState } from "react";
import siteConfig from "../siteConfig";
import { SECTION_HEADING, SECTION_WRAP } from "../styles";
import DrumKit from "./DrumKit";

function toCalendarDate(isoDate, timeStr) {
  if (!isoDate || !timeStr) return null;
  const [year, month, day] = isoDate.split("-");
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${year}${month}${day}T${String(hours).padStart(2, "0")}${minutes}00`;
}

export default function ShowsSection({ onPartClick, showsRef, standalone = false }) {
  const [hoveredPart, setHoveredPart] = useState(null);

  return (
    <section style={{ borderBottom: "1px solid #FFAE3D" }}>
      {!standalone && (
        <div style={{ minHeight: "calc(100svh - 70px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ margin: 0, padding: "1rem 0 0", textAlign: "center", fontSize: "13px", color: "#aaa", letterSpacing: "0.06em" }}>
            Hover over and click on the drum kit to explore
          </p>
          <div className="drum-kit-wrapper">
            <DrumKit
              onPartClick={onPartClick}
              hoveredPart={hoveredPart}
              setHoveredPart={setHoveredPart}
            />
          </div>
        </div>
      )}
      {/* Show cards — hidden on mobile main page, but visible inside the slide panel */}
      <div ref={showsRef} className={standalone ? undefined : "desktop-only"} style={{ background: "#fff" }}>
        <div style={SECTION_WRAP}>
        <h2 style={SECTION_HEADING}>Shows</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", alignItems: "flex-start" }}>
          {siteConfig.shows.map((show, i) => (
            <div key={i} style={{
              width: "260px", flexShrink: 0, flexGrow: 0, background: "white",
              borderRadius: "6px", border: "1px solid #d4c9a8", padding: "1rem"
            }}>
              <div style={{ fontFamily: '"Azeret Mono", monospace', fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>
                {new Date(show.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              {show.startTime && (
                <div style={{ fontFamily: '"Azeret Mono", monospace', fontSize: "11px", color: "#888", marginTop: "2px" }}>
                  {show.startTime}{show.endTime ? ` – ${show.endTime}` : ""}
                </div>
              )}
              <div style={{ fontFamily: '"Azeret Mono", monospace', fontSize: "12px", color: "#555", marginTop: "6px" }}>{show.venue}</div>
              <div style={{ fontFamily: '"Azeret Mono", monospace', fontSize: "12px", color: "#888" }}>{show.city}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.75rem" }}>
                {show.ticketUrl ? (
                  <a href={show.ticketUrl} target="_blank" rel="noreferrer" style={{
                    display: "inline-block", padding: "4px 14px", borderRadius: "4px", background: "#1a1a1a",
                    color: "white", fontFamily: '"Azeret Mono", monospace', fontSize: "10px",
                    fontWeight: 600, textDecoration: "none", letterSpacing: "0.06em", textAlign: "center"
                  }}>TICKETS</a>
                ) : (
                  <span style={{
                    display: "inline-block", padding: "4px 14px", borderRadius: "4px", background: "#e0dbd0",
                    color: "#999", fontFamily: '"Azeret Mono", monospace', fontSize: "10px",
                    fontWeight: 600, letterSpacing: "0.06em", textAlign: "center"
                  }}>SOON</span>
                )}
                {show.date && show.startTime && (
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${siteConfig.name} at ${show.venue}`)}&dates=${toCalendarDate(show.date, show.startTime)}/${toCalendarDate(show.date, show.endTime || show.startTime)}&location=${encodeURIComponent(show.venue + ", " + show.city)}`}
                    target="_blank" rel="noreferrer"
                    style={{
                      display: "inline-block", padding: "4px 14px", borderRadius: "4px",
                      border: "1px solid #d4c9a8", background: "transparent",
                      color: "#555", fontFamily: '"Azeret Mono", monospace', fontSize: "10px",
                      fontWeight: 600, textDecoration: "none", letterSpacing: "0.06em", textAlign: "center"
                    }}>+ CALENDAR</a>
                )}
              </div>
            </div>
          ))}
          {siteConfig.shows.length < 2 && (
            <div style={{ fontFamily: '"Azeret Mono", monospace', fontSize: "12px", color: "#aaa", letterSpacing: "0.06em", padding: "1rem 0", alignSelf: "center" }}>
              More shows to come...
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
