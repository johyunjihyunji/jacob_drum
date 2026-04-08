import { useState, useEffect } from "react";
import { SECTION_HEADING, SECTION_WRAP } from "../styles";

function handleMouseMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const strength = 18;
  const tx = -(dx / dist) * strength;
  const ty = -(dy / dist) * strength;
  el.style.transform = `translate(${tx}px, ${ty}px)`;
}

function handleMouseLeave(e) {
  e.currentTarget.style.transform = "translate(0, 0)";
}

export default function PhotosSection({ sectionRef }) {
  const [photoFiles, setPhotoFiles] = useState([]);
  const [spans, setSpans] = useState({});

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/photos/manifest.json`)
      .then(r => r.json())
      .then(files => setPhotoFiles(files))
      .catch(() => setPhotoFiles([]));
  }, []);

  function handleImageLoad(e, filename) {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    const ratio = w / h;
    setSpans(prev => ({
      ...prev,
      [filename]: ratio > 1.3 ? "col" : ratio < 0.77 ? "row" : "none",
    }));
  }

  return (
    <section ref={sectionRef} style={{ background: "#F9F9F6", borderTop: "1px solid #FFAE3D" }}>
      <div style={SECTION_WRAP}>
        <h2 style={SECTION_HEADING}>Photos</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
          alignItems: "start",
        }}>
          {photoFiles.map((filename, i) => {
            const span = spans[filename];
            return (
              <img key={i} src={`${process.env.PUBLIC_URL}/photos/${filename}`} alt="" style={{
                width: "100%", height: "auto", display: "block", cursor: "pointer",
                gridColumn: span === "col" ? "span 2" : undefined,
                transition: "transform 0.15s ease-out",
              }}
                onLoad={e => handleImageLoad(e, filename)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
