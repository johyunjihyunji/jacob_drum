# Jacob Isrow — Drummer Portfolio

Interactive drum kit portfolio built with React. Click the drum parts to navigate sections.

---

## Requirements

- [Node.js](https://nodejs.org) (LTS version)
- [Git](https://git-scm.com)

---

## Running locally

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
npm start
```

Opens at `http://localhost:3000`. The page hot-reloads on save.

To stop the server: `Ctrl + C`

---

## Updating content

All site content is controlled by one file:

**`src/siteConfig.js`**

Open it in any text editor and edit the fields below. Save → the site updates instantly if running locally, or auto-deploys if pushed to GitHub.

### Personal info
```js
name: "Jacob Isrow",
title: "Drummer",
location: "LA",
contactEmail: "jacobisrow@gmail.com",
```

### Bio
```js
about: {
  bio: "Your bio paragraph here.",
},
```

### Show dates
Add, edit, or remove entries. Use ISO date format (`YYYY-MM-DD`).
```js
shows: [
  {
    date: "2026-04-13",       // ISO date
    startTime: "8:00 PM",
    endTime: "11:00 PM",
    venue: "Casey's Tavern",
    city: "Los Angeles, CA",
    ticketUrl: "",            // leave "" if no link yet
  },
],
```
Google Calendar links are auto-generated from `date`, `startTime`, and `endTime`.

### YouTube videos
The video ID is the part after `?v=` in a YouTube URL.
```js
videos: [
  { youtubeId: "abc123XYZ", title: "Video Title" },
],
```

### Social links
Leave as `""` to hide the link.
```js
socials: {
  instagram:  "https://www.instagram.com/isrowdrums/",
  youtube:    "",
  spotify:    "",
  soundcloud: "",
},
```

---

## Adding photos

1. Drop image files into `public/photos/`
2. Run the manifest generator:
   ```bash
   node scripts/generate-photo-manifest.js
   ```
3. Photos appear automatically in the gallery on next start/build.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

---

## Deploying to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) and log in with GitHub
3. Click **Add New Project** → import your repo
4. Leave all settings as default (Vercel auto-detects React)
5. Click **Deploy**

You'll get a live URL like `https://your-project.vercel.app`.

**Every `git push` to `main` auto-deploys.** Your update workflow:

```bash
git add .
git commit -m "update shows"
git push
```

---

## Custom domain

#### In Vercel:
1. Project dashboard → **Settings → Domains**
2. Enter your domain (e.g. `www.jacobisrow.com`) → **Add**
3. Vercel shows DNS records — keep this tab open

#### In your DNS provider (Wix, Namecheap, GoDaddy, etc.):
- Add the **A record** or **CNAME** that Vercel gives you
- DNS changes take 15 min – 24 hours to propagate

---

## Common errors

| Error | Fix |
|-------|-----|
| `npm install` fails | Make sure Node.js is installed: `node -v` |
| Blank white page | Open browser console (F12 → Console) and check for red errors |
| Photos not showing | Run `node scripts/generate-photo-manifest.js` after adding images |
| Sounds don't play on first load | Normal — browsers require a user interaction before playing audio |
| Vercel deploy fails | Check the build log; usually a syntax error in `siteConfig.js` |
