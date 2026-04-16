import { useState } from "react";
import emailjs from "@emailjs/browser";
import siteConfig from "../siteConfig";
import { SECTION_HEADING, SECTION_WRAP } from "../styles";

const EMAILJS_SERVICE_ID  = "service_0ihejwt";
const EMAILJS_TEMPLATE_ID = "template_j7ayu2j";
const EMAILJS_PUBLIC_KEY  = "5AQHJv-jatc30tImD";

export default function ContactSection({ sectionRef }) {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState(null);

  const handleSubmit = async () => {
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again or email directly.");
    }
    setSending(false);
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
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#666", textAlign: "left", margin: "-1.5rem 0 2rem", lineHeight: 1.6 }}>
          If you are interested in working with me for lessons, recording, or live performance, please reach out here or directly at{" "}
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
            {error && (
              <p style={{ color: "#c0392b", fontFamily: "Inter, sans-serif", fontSize: "13px", margin: 0 }}>{error}</p>
            )}
            <button onClick={handleSubmit}
              disabled={!form.name || !form.email || !form.message || sending}
              style={{
                padding: "0.9rem", borderRadius: "8px", border: "none",
                background: "#1a1a1a", color: "#fff", fontFamily: "Inter, sans-serif",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                opacity: (!form.name || !form.email || !form.message || sending) ? 0.45 : 1,
                transition: "opacity 0.15s"
              }}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
