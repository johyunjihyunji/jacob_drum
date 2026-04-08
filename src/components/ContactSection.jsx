import { useState } from "react";
import siteConfig from "../siteConfig";
import { SECTION_HEADING, SECTION_WRAP } from "../styles";

export default function ContactSection({ sectionRef }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const field = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
    border: "1.5px solid #e5e5e5", fontFamily: "Inter, sans-serif",
    fontSize: "14px", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.15s", background: "#fff"
  };

  return (
    <section ref={sectionRef} style={{ background: "#F9F9F6", borderTop: "1px solid #FFAE3D" }}>
      <div style={{ ...SECTION_WRAP, maxWidth: "560px" }}>
        <h2 style={{ ...SECTION_HEADING, textAlign: "center" }}>Get in Touch</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#666", textAlign: "center", margin: "-1.5rem 0 2rem", lineHeight: 1.6 }}>
          Feel free to reach out via the form below or directly at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} style={{ color: "#1a1a1a", fontWeight: 600 }}>{siteConfig.contactEmail}</a>.
        </p>
        {sent ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div style={{ fontSize: "56px", marginBottom: "1rem" }}>✓</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", margin: "0 0 0.5rem", fontSize: "22px" }}>Message sent!</h3>
            <p style={{ color: "#666", fontFamily: "Inter, sans-serif", fontSize: "15px" }}>{siteConfig.name} will get back to you soon.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
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
              <textarea style={{ ...field, height: "140px", resize: "vertical" }} placeholder={`Tell ${siteConfig.name} about your project...`}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={e => e.target.style.borderColor = "#1a1a1a"}
                onBlur={e => e.target.style.borderColor = "#e5e5e5"} />
            </div>
            <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.message}
              style={{
                padding: "0.9rem", borderRadius: "8px", border: "none",
                background: "#1a1a1a", color: "#fff", fontFamily: "Inter, sans-serif",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                opacity: (!form.name || !form.email || !form.message) ? 0.45 : 1,
                transition: "opacity 0.15s"
              }}>
              Send Message
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
