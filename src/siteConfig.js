// ─────────────────────────────────────────────────────────────────────────────
// JACOB ISROW — SITE CONFIGURATION
//
// Edit this file to update all content on the website.
// After saving your changes, the site needs to be rebuilt and redeployed.
// Ask your developer, or push to GitHub — Vercel will redeploy automatically.
// ─────────────────────────────────────────────────────────────────────────────

const siteConfig = {

  // ── Personal Info ────────────────────────────────────────────────────────────
  // Shown in the header and in the speech bubble when you hover the drummer.
  name: "Jacob Isrow",
  title: "Drummer",       // subtitle under your name in the header
  location: "LA",        // shown next to your title in the speech bubble


  // ── Contact Email ────────────────────────────────────────────────────────────
  // When someone submits the contact form, their message opens in your
  // email app pre-addressed to this address.
  contactEmail: "jacobisrow@gmail.com",


  // ── About ────────────────────────────────────────────────────────────────────
  // Shown when visitors click the drummer figure in the illustration.
  // bio: 1–3 sentence paragraph about Jacob.
  // highlights: short bullet points (e.g. career milestones, notable shows).
  //             Delete or add lines as needed.
  about: {
    bio: "I am a drummer, teacher, and bandleader based in Los Angeles. I have been dedicated to the drums for over fourteen years, studying with world-renowned drummers including Chris Blondal, Jason Harnell, and Ted Moore. I'm fluent across a wide variety of genres, including but not limited to, jazz, R&B, funk, hip-hop, rock, metal, and Latin/Afro-Cuban music.\n\nI grew up in Los Angeles and studied both music and cognitive science at UC Berkeley. During my time in the San Francisco Bay Area, I served as President of the UC Jazz Ensembles and performed at various venues throughout the Bay. Now I'm back home in LA, carving a lane for myself in the city where my musical life began. I am leading my own band, The Aughts, playing regularly across LA as a sideman, and running a private teaching practice.\n\nBe it for live performance, touring, recording work, or lessons, please do not hesistate to reach out to me! ",
  },


  // ── Social Links ─────────────────────────────────────────────────────────────
  // Paste the full URL for each platform you use.
  // Leave as an empty string "" to hide that link on the site.
  socials: {
    instagram:  "https://www.instagram.com/isrowdrums/",   // e.g. "https://instagram.com/jacobisrow"
    youtube:    "",   // e.g. "https://youtube.com/@jacobisrow"
    spotify:    "",   // e.g. "https://open.spotify.com/artist/..."
    soundcloud: "",   // e.g. "https://soundcloud.com/jacobisrow"
  },


  // ── Show Dates ───────────────────────────────────────────────────────────────
  // Up to 4 shows are displayed on the stage floor illustration.
  // Add, remove, or edit entries below.
  //
  //   date:      Short label shown on the ticket card, e.g. "Apr 18"
  //   venue:     Name of the venue, e.g. "The Bowery"
  //   city:      City shown below the venue, e.g. "NYC"
  //   ticketUrl: Full URL to purchase tickets — use "" if there is no link yet
  // ── Show Dates ───────────────────────────────────────────────────────────────
  // date:      ISO format "YYYY-MM-DD", e.g. "2026-04-13"
  // startTime: "8:00 PM"
  // endTime:   "11:00 PM"
  // venue, city, ticketUrl as before
  shows: [
    {
      date: "2026-05-15",
      startTime: "6:00 PM",
      endTime: "9:00 PM",
      venue: "Lonell's Soul Food",
      city: "Inglewood, CA",
      ticketUrl: "",
    },
    {
      date: "2026-06-01",
      startTime: "8:00 PM",
      endTime: "11:00 PM",
      venue: "Casey's Tavern",
      city: "Canoga Park, CA",
      ticketUrl: "",
    }
    {
      date: "2026-06-07",
      startTime: "6:00 PM",
      endTime: "9:00 PM",
      venue: "The Venice West,
      city: "Venice, CA",
      ticketUrl: "",
    }
  ],


  // ── YouTube Videos ───────────────────────────────────────────────────────────
  // Add one entry per video you want listed in the Videos modal.
  //
  //   youtubeId: the part after "watch?v=" in the YouTube URL
  //              Example: for https://youtube.com/watch?v=abc123XYZ
  //              the youtubeId is "abc123XYZ"
  //   title:     Label shown next to the video thumbnail
  videos: [
    { youtubeId: "99w2fj19PEc", title: "UC Berkeley Jazz Ensemble Spring Concert 2025 - No Ice Cream Allowed" },
    { youtubeId: "_i134xtKq20", title: "UC Jazz Ensembles Fall Concert 2024 - Minor Blues" }, 
    { youtubeId: "Z5YVoZu63X8", title: "Psych! Big Band - I Still Haven't Found What I'm Looking For" }
  ],


  // ── Photo Gallery ────────────────────────────────────────────────────────────
  // Photos are auto-discovered from the public/photos/ folder.
  // Drop image files there and they will appear automatically on next build/start.
  // No manual listing needed — manifest.json is generated by scripts/generate-photo-manifest.js.

};

export default siteConfig;
