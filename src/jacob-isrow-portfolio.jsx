import { useState, useEffect, useRef } from "react";

// ─── Audio Engine ───────────────────────────────────────────────────────────
function createAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

function playDrumSound(type) {
  const ctx = createAudioContext();
  const now = ctx.currentTime;

  switch (type) {
    case "bass": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now); osc.stop(now + 0.6);
      break;
    }
    case "snare": {
      const bufSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const snareGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass"; filter.frequency.value = 1200;
      noise.connect(filter); filter.connect(snareGain); snareGain.connect(ctx.destination);
      snareGain.gain.setValueAtTime(0.8, now);
      snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      noise.start(now); noise.stop(now + 0.2);
      break;
    }
    case "hihat": {
      const bufSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass"; filter.frequency.value = 8000;
      const gain = ctx.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      noise.start(now); noise.stop(now + 0.1);
      break;
    }
    case "cymbal": {
      const bufSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass"; filter.frequency.value = 6000; filter.Q.value = 0.5;
      const gain = ctx.createGain();
      noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      noise.start(now); noise.stop(now + 0.8);
      break;
    }
    case "tom_hi": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now); osc.stop(now + 0.25);
      break;
    }
    case "tom_mid": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now); osc.stop(now + 0.35);
      break;
    }
    case "tom_floor": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now); osc.stop(now + 0.45);
      break;
    }
    default: break;
  }
}

// ─── Modal ──────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem"
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "16px", maxWidth: "600px",
        width: "100%", maxHeight: "80vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 80px rgba(0,0,0,0.18)"
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.5rem 1.75rem 1rem", borderBottom: "1px solid #f0f0f0"
        }}>
          <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1a1a1a" }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "24px", color: "#999", lineHeight: 1, padding: "4px"
          }}>×</button>
        </div>
        <div style={{ overflowY: "auto", padding: "1.5rem 1.75rem" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Videos Modal Content ────────────────────────────────────────────────────
function VideosContent() {
  const videos = [
    { id: "dQw4w9WgXcQ", title: "Live at The Bowery — Full Set" },
    { id: "dQw4w9WgXcQ", title: "Studio Session: Rhythm & Blues Breakdown" },
    { id: "dQw4w9WgXcQ", title: "Jacob Isrow — Drum Solo 2024" },
    { id: "dQw4w9WgXcQ", title: "Behind the Kit: Practice Routine" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {videos.map((v, i) => (
        <a key={i} href={`https://youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "1rem",
            padding: "0.875rem 1rem", borderRadius: "10px",
            border: "1px solid #eee", textDecoration: "none", color: "#1a1a1a",
            transition: "background 0.15s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#f9f9f9"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div style={{
            width: "48px", height: "48px", borderRadius: "8px",
            background: "#e8e8e8", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0, fontSize: "20px"
          }}>▶</div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px" }}>{v.title}</span>
        </a>
      ))}
      <p style={{ fontSize: "13px", color: "#999", textAlign: "center", margin: "0.5rem 0 0", fontFamily: "Inter, sans-serif" }}>
        Replace video IDs with your actual YouTube links
      </p>
    </div>
  );
}

// ─── Photos Modal Content ────────────────────────────────────────────────────
function PhotosContent() {
  const photos = [
    { label: "Live at Terminal 5", color: "#1a1a1a" },
    { label: "Recording Session", color: "#2a2a2a" },
    { label: "Tour — Chicago", color: "#333" },
    { label: "Backstage", color: "#222" },
    { label: "Drum Clinic", color: "#2c2c2c" },
    { label: "Brooklyn Studio", color: "#1e1e1e" },
  ];
  return (
    <div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: "0.625rem"
      }}>
        {photos.map((p, i) => (
          <div key={i} style={{
            aspectRatio: "1", borderRadius: "8px",
            background: `linear-gradient(135deg, ${p.color}, #555)`,
            display: "flex", alignItems: "flex-end",
            overflow: "hidden", cursor: "pointer",
            transition: "transform 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <span style={{
              padding: "0.5rem", fontSize: "11px", color: "rgba(255,255,255,0.8)",
              fontFamily: "Inter, sans-serif"
            }}>{p.label}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: "13px", color: "#999", textAlign: "center", margin: "1rem 0 0", fontFamily: "Inter, sans-serif" }}>
        Replace placeholders with your actual photos
      </p>
    </div>
  );
}

// ─── Contact Modal Content ───────────────────────────────────────────────────
function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    // Replace CONTACT_EMAIL below with Jacob's actual email
    // This uses EmailJS or a mailto fallback — configure as needed
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ fontSize: "48px", marginBottom: "1rem" }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", margin: "0 0 0.5rem", fontSize: "20px" }}>Message sent!</h3>
      <p style={{ color: "#666", fontFamily: "Inter, sans-serif", fontSize: "14px" }}>Jacob will get back to you soon.</p>
    </div>
  );

  const field = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
    border: "1.5px solid #e5e5e5", fontFamily: "Inter, sans-serif",
    fontSize: "14px", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.15s"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#666", fontFamily: "Inter, sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</label>
        <input style={field} placeholder="Your name"
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "#1a1a1a"}
          onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
      </div>
      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#666", fontFamily: "Inter, sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
        <input style={field} type="email" placeholder="your@email.com"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "#1a1a1a"}
          onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
      </div>
      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#666", fontFamily: "Inter, sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
        <textarea style={{ ...field, height: "120px", resize: "vertical" }} placeholder="Tell Jacob about your project..."
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "#1a1a1a"}
          onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
      </div>
      <button onClick={handleSubmit} disabled={sending || !form.name || !form.email || !form.message}
        style={{
          padding: "0.875rem", borderRadius: "8px", border: "none",
          background: "#1a1a1a", color: "#fff", fontFamily: "Inter, sans-serif",
          fontSize: "14px", fontWeight: 600, cursor: "pointer",
          opacity: (sending || !form.name || !form.email || !form.message) ? 0.5 : 1,
          transition: "opacity 0.15s"
        }}>
        {sending ? "Sending…" : "Send Message"}
      </button>
    </div>
  );
}

// ─── Drum Kit SVG Illustration ───────────────────────────────────────────────
function DrumKit({ onPartClick, hoveredPart, setHoveredPart }) {
  const parts = {
    bass:      { label: "Videos",  highlight: "#e8c547" },
    snare:     { label: "Snare",   highlight: "#e89547" },
    hihat:     { label: "Contact", highlight: "#47b8e8" },
    ride:      { label: "Photos",  highlight: "#a347e8" },
    tom_hi:    { label: "Hi Tom",  highlight: "#e84747" },
    tom_mid:   { label: "Mid Tom", highlight: "#47e88c" },
    tom_floor: { label: "Floor Tom", highlight: "#e84794" },
    drummer:   { label: "",        highlight: "transparent" },
  };

  const hp = hoveredPart;
  const fill = (part) => hp === part ? parts[part].highlight : "transparent";
  const stroke = (part) => hp === part ? parts[part].highlight : "#1a1a1a";

  return (
    <svg
      viewBox="0 0 800 550"
      width="100%"
      style={{ maxWidth: "820px", display: "block", margin: "0 auto" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          .drum-part { cursor: pointer; transition: all 0.15s; }
          .drum-part:hover { filter: brightness(1.15); }
          .label-tag {
            font-family: 'Playfair Display', serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            pointer-events: none;
          }
          @keyframes wave {
            0%,100% { transform: translateX(400px) translateY(80px) rotate(-2deg); }
            50% { transform: translateX(400px) translateY(80px) rotate(4deg); }
          }
          .drummer-wave { transform-origin: center bottom; animation: none; }
          .drummer-wave.waving { animation: wave 0.6s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* ── Stage floor ── */}
      <rect x="0" y="430" width="800" height="120" fill="#f5f0e8" rx="0"/>
      <line x1="0" y1="430" x2="800" y2="430" stroke="#d4c9a8" strokeWidth="2"/>
      {/* Stage wood grain lines */}
      {[445,460,475,490,505,520].map(y => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#e8e0c8" strokeWidth="0.5"/>
      ))}

      {/* ── Stage curtain bg ── */}
      <rect x="0" y="0" width="800" height="435" fill="#fafaf7"/>
      {/* Subtle spotlight circles */}
      <circle cx="400" cy="300" r="280" fill="rgba(255,248,220,0.3)"/>
      <circle cx="400" cy="300" r="180" fill="rgba(255,248,200,0.25)"/>

      {/* ── Show event boxes (stage floor) ── */}
      {[
        { x: 30,  label: "Apr 18", venue: "The Bowery, NYC" },
        { x: 200, label: "May 3",  venue: "Schuba's, Chicago" },
        { x: 570, label: "May 22", venue: "The Troubadour, LA" },
        { x: 650, label: "Jun 7",  venue: "9:30 Club, DC" },
      ].map((show, i) => (
        <g key={i} transform={`translate(${show.x}, 445)`}>
          <rect width="140" height="75" rx="6" fill="white" stroke="#d4c9a8" strokeWidth="1"/>
          <text x="12" y="20" style={{ fontFamily: "Playfair Display, serif", fontSize: "11px", fontWeight: 700, fill: "#1a1a1a", letterSpacing: "0.05em" }}>{show.label}</text>
          <text x="12" y="37" style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fill: "#666" }}>{show.venue}</text>
          <rect x="8" y="50" width="52" height="16" rx="3" fill="#1a1a1a"/>
          <text x="34" y="62" textAnchor="middle" style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", fill: "white", fontWeight: 600, letterSpacing: "0.05em" }}>TICKETS</text>
        </g>
      ))}

      {/* ── Bass drum ── */}
      <g className="drum-part" onClick={() => onPartClick("bass")}
        onMouseEnter={() => setHoveredPart("bass")}
        onMouseLeave={() => setHoveredPart(null)}>
        <ellipse cx="400" cy="390" rx="110" ry="85" fill={hp === "bass" ? "#e8c54722" : "#f0ede5"} stroke={stroke("bass")} strokeWidth="2.5"/>
        <ellipse cx="400" cy="390" rx="90" ry="68" fill="none" stroke={stroke("bass")} strokeWidth="1.5" strokeDasharray="4,3"/>
        <ellipse cx="400" cy="390" rx="60" ry="45" fill={hp === "bass" ? "#e8c54744" : "#e8e4d8"} stroke={stroke("bass")} strokeWidth="1.5"/>
        {hp === "bass" && <text x="400" y="395" textAnchor="middle" className="label-tag" fill="#1a1a1a">Videos</text>}
        {/* Bass drum legs */}
        <line x1="310" y1="450" x2="300" y2="480" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="490" y1="450" x2="500" y2="480" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="300" y1="480" x2="320" y2="480" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="500" y1="480" x2="480" y2="480" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
      </g>

      {/* ── Snare drum ── */}
      <g className="drum-part" onClick={() => onPartClick("snare")}
        onMouseEnter={() => setHoveredPart("snare")}
        onMouseLeave={() => setHoveredPart(null)}>
        <ellipse cx="265" cy="340" rx="52" ry="18" fill={hp === "snare" ? "#e8954722" : "#f0ede5"} stroke={stroke("snare")} strokeWidth="2"/>
        <rect x="213" y="340" width="104" height="28" rx="2" fill={hp === "snare" ? "#e8954722" : "#e8e4d8"} stroke={stroke("snare")} strokeWidth="2"/>
        <ellipse cx="265" cy="368" rx="52" ry="18" fill={hp === "snare" ? "#e8954733" : "#f0ede5"} stroke={stroke("snare")} strokeWidth="2"/>
        {/* Snare wires */}
        {[-10,-3,4,11,18].map(x => (
          <line key={x} x1={265+x} y1="362" x2={265+x} y2="374" stroke="#aaa" strokeWidth="0.5"/>
        ))}
        {/* Snare stand */}
        <line x1="265" y1="386" x2="255" y2="420" stroke="#888" strokeWidth="2"/>
        <line x1="265" y1="386" x2="275" y2="420" stroke="#888" strokeWidth="2"/>
        <line x1="252" y1="420" x2="278" y2="420" stroke="#888" strokeWidth="2"/>
        {hp === "snare" && <text x="265" y="354" textAnchor="middle" className="label-tag" fill="#1a1a1a">Snare</text>}
      </g>

      {/* ── Hi-Hat ── */}
      <g className="drum-part" onClick={() => onPartClick("hihat")}
        onMouseEnter={() => setHoveredPart("hihat")}
        onMouseLeave={() => setHoveredPart(null)}>
        {/* Stand */}
        <line x1="175" y1="270" x2="170" y2="430" stroke="#888" strokeWidth="2.5"/>
        <line x1="155" y1="430" x2="195" y2="430" stroke="#888" strokeWidth="2.5"/>
        <line x1="155" y1="430" x2="145" y2="460" stroke="#888" strokeWidth="2"/>
        <line x1="195" y1="430" x2="205" y2="460" stroke="#888" strokeWidth="2"/>
        {/* Top cymbal */}
        <ellipse cx="175" cy="258" rx="55" ry="10" fill={hp === "hihat" ? "#47b8e822" : "#ede9e0"} stroke={stroke("hihat")} strokeWidth="2"/>
        {/* Bottom cymbal */}
        <ellipse cx="175" cy="272" rx="55" ry="10" fill={hp === "hihat" ? "#47b8e822" : "#e8e4d8"} stroke={stroke("hihat")} strokeWidth="2"/>
        {hp === "hihat" && <text x="175" y="238" textAnchor="middle" className="label-tag" fill="#1a1a1a">Contact</text>}
      </g>

      {/* ── Ride Cymbal ── */}
      <g className="drum-part" onClick={() => onPartClick("ride")}
        onMouseEnter={() => setHoveredPart("ride")}
        onMouseLeave={() => setHoveredPart(null)}>
        {/* Ride stand */}
        <line x1="590" y1="280" x2="610" y2="430" stroke="#888" strokeWidth="2.5"/>
        <line x1="595" y1="430" x2="635" y2="430" stroke="#888" strokeWidth="2.5"/>
        <line x1="595" y1="430" x2="585" y2="460" stroke="#888" strokeWidth="2"/>
        <line x1="635" y1="430" x2="645" y2="460" stroke="#888" strokeWidth="2"/>
        {/* Ride cymbal — larger, angled */}
        <ellipse cx="570" cy="265" rx="78" ry="14" fill={hp === "ride" ? "#a347e822" : "#ede9e0"} stroke={stroke("ride")} strokeWidth="2"
          transform="rotate(-8, 570, 265)"/>
        {/* Bell */}
        <ellipse cx="570" cy="263" rx="14" ry="6" fill={hp === "ride" ? "#a347e833" : "#d8d4c8"} stroke={stroke("ride")} strokeWidth="1.5"
          transform="rotate(-8, 570, 265)"/>
        {hp === "ride" && <text x="570" y="242" textAnchor="middle" className="label-tag" fill="#1a1a1a">Photos</text>}
      </g>

      {/* ── Hi Tom ── */}
      <g className="drum-part" onClick={() => onPartClick("tom_hi")}
        onMouseEnter={() => setHoveredPart("tom_hi")}
        onMouseLeave={() => setHoveredPart(null)}>
        <ellipse cx="318" cy="270" rx="48" ry="16" fill={hp === "tom_hi" ? "#e8474722" : "#f0ede5"} stroke={stroke("tom_hi")} strokeWidth="2"/>
        <rect x="270" y="270" width="96" height="38" rx="2" fill={hp === "tom_hi" ? "#e8474722" : "#e8e4d8"} stroke={stroke("tom_hi")} strokeWidth="2"/>
        <ellipse cx="318" cy="308" rx="48" ry="16" fill={hp === "tom_hi" ? "#e8474733" : "#f0ede5"} stroke={stroke("tom_hi")} strokeWidth="2"/>
        {hp === "tom_hi" && <text x="318" y="288" textAnchor="middle" className="label-tag" fill="#1a1a1a">Hi Tom</text>}
      </g>

      {/* ── Mid Tom ── */}
      <g className="drum-part" onClick={() => onPartClick("tom_mid")}
        onMouseEnter={() => setHoveredPart("tom_mid")}
        onMouseLeave={() => setHoveredPart(null)}>
        <ellipse cx="480" cy="272" rx="50" ry="17" fill={hp === "tom_mid" ? "#47e88c22" : "#f0ede5"} stroke={stroke("tom_mid")} strokeWidth="2"/>
        <rect x="430" y="272" width="100" height="40" rx="2" fill={hp === "tom_mid" ? "#47e88c22" : "#e8e4d8"} stroke={stroke("tom_mid")} strokeWidth="2"/>
        <ellipse cx="480" cy="312" rx="50" ry="17" fill={hp === "tom_mid" ? "#47e88c33" : "#f0ede5"} stroke={stroke("tom_mid")} strokeWidth="2"/>
        {hp === "tom_mid" && <text x="480" y="292" textAnchor="middle" className="label-tag" fill="#1a1a1a">Mid Tom</text>}
      </g>

      {/* ── Floor Tom ── */}
      <g className="drum-part" onClick={() => onPartClick("tom_floor")}
        onMouseEnter={() => setHoveredPart("tom_floor")}
        onMouseLeave={() => setHoveredPart(null)}>
        <ellipse cx="565" cy="355" rx="60" ry="20" fill={hp === "tom_floor" ? "#e8479422" : "#f0ede5"} stroke={stroke("tom_floor")} strokeWidth="2"/>
        <rect x="505" y="355" width="120" height="55" rx="2" fill={hp === "tom_floor" ? "#e8479422" : "#e8e4d8"} stroke={stroke("tom_floor")} strokeWidth="2"/>
        <ellipse cx="565" cy="410" rx="60" ry="20" fill={hp === "tom_floor" ? "#e8479433" : "#f0ede5"} stroke={stroke("tom_floor")} strokeWidth="2"/>
        {/* Floor tom legs */}
        <line x1="520" y1="405" x2="515" y2="435" stroke="#888" strokeWidth="2"/>
        <line x1="565" y1="408" x2="565" y2="435" stroke="#888" strokeWidth="2"/>
        <line x1="610" y1="405" x2="615" y2="435" stroke="#888" strokeWidth="2"/>
        {hp === "tom_floor" && <text x="565" y="378" textAnchor="middle" className="label-tag" fill="#1a1a1a">Floor Tom</text>}
      </g>

      {/* ── Drummer (body) ── */}
      <g className={`drum-part drummer-wave ${hp === "drummer" ? "waving" : ""}`}
        style={{ transformOrigin: "400px 420px" }}
        onClick={() => onPartClick("drummer")}
        onMouseEnter={() => setHoveredPart("drummer")}
        onMouseLeave={() => setHoveredPart(null)}>
        {/* Stool */}
        <rect x="375" y="385" width="50" height="6" rx="3" fill="#888"/>
        <line x1="390" y1="391" x2="385" y2="420" stroke="#888" strokeWidth="2.5"/>
        <line x1="410" y1="391" x2="415" y2="420" stroke="#888" strokeWidth="2.5"/>
        {/* Legs */}
        <rect x="378" y="360" width="20" height="28" rx="4" fill="#2a3a5c"/>
        <rect x="402" y="360" width="20" height="28" rx="4" fill="#2a3a5c"/>
        {/* Torso */}
        <rect x="368" y="280" width="64" height="88" rx="10" fill="#3a4f7a"/>
        {/* Left arm + drumstick */}
        <line x1="368" y1="300" x2="300" y2="330" stroke="#f5d5a8" strokeWidth="8" strokeLinecap="round"/>
        <line x1="300" y1="330" x2="275" y2="350" stroke="#c8a870" strokeWidth="4" strokeLinecap="round"/>
        {/* Right arm + drumstick */}
        <line x1="432" y1="298" x2="495" y2="340" stroke="#f5d5a8" strokeWidth="8" strokeLinecap="round"/>
        <line x1="495" y1="340" x2="510" y2="360" stroke="#c8a870" strokeWidth="4" strokeLinecap="round"/>
        {/* Neck */}
        <rect x="390" y="262" width="20" height="22" rx="5" fill="#f5d5a8"/>
        {/* Head */}
        <ellipse cx="400" cy="248" rx="30" ry="32" fill="#f5d5a8"/>
        {/* Hair */}
        <ellipse cx="400" cy="222" rx="30" ry="16" fill="#3a2a1a"/>
        <rect x="370" y="215" width="60" height="16" rx="6" fill="#3a2a1a"/>
        {/* Eyes */}
        <circle cx="390" cy="245" r="3" fill="#1a1a1a"/>
        <circle cx="410" cy="245" r="3" fill="#1a1a1a"/>
        {/* Smile */}
        <path d="M 390 258 Q 400 266 410 258" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>

      {/* ── Speech bubble ── */}
      {hp === "drummer" && (
        <g>
          <rect x="440" y="150" width="200" height="80" rx="12" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
          <polygon points="450,230 440,248 465,230" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
          <polygon points="450,230 465,230 455,230" fill="white"/>
          <text x="540" y="178" textAnchor="middle" style={{ fontFamily: "Playfair Display, serif", fontSize: "12px", fontWeight: 700, fill: "#1a1a1a" }}>Jacob Isrow</text>
          <text x="540" y="196" textAnchor="middle" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fill: "#555" }}>Drummer · NYC</text>
          <text x="540" y="213" textAnchor="middle" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fill: "#555" }}>Click any drum to explore →</text>
        </g>
      )}
    </svg>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [modal, setModal] = useState(null); // null | "videos" | "photos" | "contact"

  const handlePartClick = (part) => {
    playDrumSound(part === "ride" ? "cymbal" : part === "tom_hi" ? "tom_hi" : part === "tom_mid" ? "tom_mid" : part === "tom_floor" ? "tom_floor" : part);
    if (part === "bass") setModal("videos");
    else if (part === "ride") setModal("photos");
    else if (part === "hihat") setModal("contact");
    // snare, toms, drummer just play sounds / wave
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#fafaf7",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "2rem 3rem", borderBottom: "1px solid #ece8df"
      }}>
        <div>
          <h1 style={{
            margin: 0, fontFamily: "'Playfair Display', serif",
            fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1a1a"
          }}>Jacob Isrow</h1>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>Drummer</p>
        </div>
        <nav style={{ display: "flex", gap: "2rem" }}>
          {["Videos", "Photos", "Contact"].map(item => (
            <button key={item} onClick={() => setModal(item.toLowerCase())}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "13px", color: "#666", letterSpacing: "0.08em",
                textTransform: "uppercase", fontFamily: "Inter, sans-serif",
                padding: 0, transition: "color 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
              onMouseLeave={e => e.currentTarget.style.color = "#666"}
            >{item}</button>
          ))}
        </nav>
      </header>

      {/* Hero hint */}
      <div style={{ textAlign: "center", padding: "1.5rem 0 0.5rem" }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#aaa", letterSpacing: "0.06em" }}>
          Hover and click the drum kit to explore
        </p>
      </div>

      {/* Main illustration */}
      <main style={{ padding: "0 1rem 2rem" }}>
        <DrumKit
          onPartClick={handlePartClick}
          hoveredPart={hoveredPart}
          setHoveredPart={setHoveredPart}
        />
      </main>

      {/* Legend */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "1.5rem",
        padding: "0 1rem 2rem", flexWrap: "wrap"
      }}>
        {[
          { part: "bass drum", label: "Videos", color: "#e8c547" },
          { part: "ride cymbal", label: "Photos", color: "#a347e8" },
          { part: "hi-hats", label: "Contact", color: "#47b8e8" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color }}/>
            <span style={{ fontSize: "12px", color: "#888", letterSpacing: "0.06em" }}>
              {item.part} → {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Modals */}
      <Modal isOpen={modal === "videos"} onClose={() => setModal(null)} title="Videos">
        <VideosContent />
      </Modal>
      <Modal isOpen={modal === "photos"} onClose={() => setModal(null)} title="Photos">
        <PhotosContent />
      </Modal>
      <Modal isOpen={modal === "contact"} onClose={() => setModal(null)} title="Get in Touch">
        <ContactContent />
      </Modal>
    </div>
  );
}
