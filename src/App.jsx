import { useEffect, useRef, useState } from "react";
import { playDrumSound } from "./audio";
import siteConfig from "./siteConfig";
import Header from "./components/Header";
import ShowsSection from "./components/ShowsSection";
import AboutSection from "./components/AboutSection";
import VideosSection from "./components/VideosSection";
import PhotosSection from "./components/PhotosSection";
import ContactSection from "./components/ContactSection";

const mono = '"Azeret Mono", monospace';

export default function App() {
  const aboutRef   = useRef(null);
  const videosRef  = useRef(null);
  const showsRef   = useRef(null);
  const photosRef  = useRef(null);
  const contactRef = useRef(null);
  const dummyRef   = useRef(null);

  const [activePanel, setActivePanel] = useState(null);

  const HEADER_HEIGHT = 64;

  const scrollTo = (ref, hash) => {
    const y = ref.current.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
    window.history.replaceState(null, "", hash);
  };

  // On mount, scroll to hash if present in the URL
  useEffect(() => {
    const hash = window.location.hash;
    const map = {
      "#about":   aboutRef,
      "#videos":  videosRef,
      "#shows":   showsRef,
      "#photos":  photosRef,
      "#contact": contactRef,
    };
    const ref = map[hash];
    if (ref?.current) {
      setTimeout(() => scrollTo(ref, hash), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (section) => {
    const map = {
      about:   { ref: aboutRef,   hash: "#about" },
      videos:  { ref: videosRef,  hash: "#videos" },
      shows:   { ref: showsRef,   hash: "#shows" },
      photos:  { ref: photosRef,  hash: "#photos" },
      contact: { ref: contactRef, hash: "#contact" },
    };
    const target = map[section];
    if (target) scrollTo(target.ref, target.hash);
  };

  const handlePartClick = (part) => {
    const soundMap = {
      ride:     "cymbal",
      tom_hi:   "tom_hi",
      tom_mid:  "tom_mid",
      tom_floor:"tom_floor",
      drummer:  "snare",
    };
    playDrumSound(soundMap[part] || part);

    // Instagram link (all screen sizes)
    if (part === "tom_hi" && siteConfig.socials.instagram) {
      window.open(siteConfig.socials.instagram, "_blank", "noreferrer");
      return;
    }

    // Mobile: open slide panel instead of scrolling
    if (window.innerWidth <= 768) {
      const panelMap = {
        bass:    "videos",
        ride:    "shows",
        tom_mid: "photos",
        hihat:   "contact",
        drummer: "about",
      };
      const panel = panelMap[part];
      if (panel) setActivePanel(panel);
      return;
    }

    // Desktop: scroll to section
    if (part === "bass")    scrollTo(videosRef,  "#videos");
    if (part === "ride")    scrollTo(showsRef,   "#shows");
    if (part === "tom_mid") scrollTo(photosRef,  "#photos");
    if (part === "hihat")   scrollTo(contactRef, "#contact");
    if (part === "drummer") scrollTo(aboutRef,   "#about");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F9F9F6", fontFamily: "'Inter', sans-serif" }}>
      <Header onNavClick={handleNavClick} />
      <ShowsSection onPartClick={handlePartClick} showsRef={showsRef} />
      <div className="desktop-only">
        <AboutSection   sectionRef={aboutRef} />
        <PhotosSection  sectionRef={photosRef} />
        <VideosSection  sectionRef={videosRef} />
        <ContactSection sectionRef={contactRef} />
      </div>

      {/* ── Mobile slide-in panel ── */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#F9F9F6",
        zIndex: 500,
        overflowY: "auto",
        transform: activePanel ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Close button */}
        <button
          onClick={() => setActivePanel(null)}
          aria-label="Close"
          style={{
            position: "sticky",
            top: "1rem",
            float: "right",
            marginRight: "1rem",
            zIndex: 600,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: mono,
            fontSize: "20px",
            color: "#1a1a1a",
            lineHeight: 1,
            padding: "0.5rem",
          }}
        >✕</button>

        {activePanel === "about"   && <AboutSection   sectionRef={dummyRef} />}
        {activePanel === "shows"   && <ShowsSection   standalone showsRef={dummyRef} onPartClick={() => {}} />}
        {activePanel === "photos"  && <PhotosSection  sectionRef={dummyRef} />}
        {activePanel === "videos"  && <VideosSection  sectionRef={dummyRef} />}
        {activePanel === "contact" && <ContactSection sectionRef={dummyRef} />}
      </div>
    </div>
  );
}
