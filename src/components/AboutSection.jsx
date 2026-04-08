import siteConfig from "../siteConfig";
import { SECTION_WRAP } from "../styles";

const mono = '"Azeret Mono", monospace';
const sans = "Inter, sans-serif";

export default function AboutSection({ sectionRef }) {
  const { name, about } = siteConfig;

  return (
    <section ref={sectionRef} style={{ background: "#F9F9F6", borderTop: "1px solid #FFAE3D" }}>
      <div style={SECTION_WRAP}>

        <h2 style={{ margin: "0 0 2rem", fontFamily: mono, fontSize: "clamp(16px, 2.5vw, 16px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.02em" }}>About</h2>

        {/* ── Two-column layout: photo left, content right ── */}
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Photo */}
          <img
            src="/photos/4.jpeg"
            alt={name}
            style={{ width: "clamp(180px, 32%, 320px)", height: "auto", display: "block", flexShrink: 0 }}
          />

          {/* Bio */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <h2 style={{ margin: "0 0 1rem", fontFamily: mono, fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1a1a" }}>
              {name}
            </h2>
            <p style={{ fontFamily: sans, fontSize: "15px", lineHeight: 1.8, color: "#555", margin: 0 }}>
              {about.bio}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
