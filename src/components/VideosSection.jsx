import siteConfig from "../siteConfig";
import { SECTION_HEADING, SECTION_WRAP } from "../styles";

export default function VideosSection({ sectionRef }) {
  const videos = siteConfig.videos;
  return (
    <section ref={sectionRef} style={{ background: "#fff", borderTop: "1px solid #FFAE3D" }}>
      <div style={SECTION_WRAP}>
        <h2 style={SECTION_HEADING}>Videos</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
          {videos.map((v, i) => (
            <a key={i} href={`https://youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noreferrer"
              style={{ textDecoration: "none", color: "#1a1a1a", borderRadius: "10px", overflow: "hidden", border: "1px solid #e8e4d8", background: "#fff", display: "block", transition: "box-shadow 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{
                aspectRatio: "16/9", background: `url(https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg) center/cover no-repeat #e8e4d8`,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
              }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: "18px", marginLeft: "3px" }}>▶</span>
                </div>
              </div>
              <div style={{ padding: "0.875rem 1rem" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: 1.4 }}>{v.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
