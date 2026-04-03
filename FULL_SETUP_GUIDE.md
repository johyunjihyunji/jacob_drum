# Jacob Isrow Portfolio — Full Setup Guide
## From empty repo → working app → live on Wix

---

## What you need before starting
- [ ] Node.js installed → https://nodejs.org (download LTS)
- [ ] Git installed → https://git-scm.com
- [ ] A GitHub/GitLab account with your empty repo
- [ ] The file `jacob-isrow-portfolio.jsx` downloaded to your computer
- [ ] A free Vercel account → https://vercel.com (sign up with GitHub)

---

## Step 1 — Clone your empty repo

Open Terminal (Mac) or Command Prompt (Windows).

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

You're now inside your empty project folder.

---

## Step 2 — Create the React app inside it

```bash
npx create-react-app .
```

The `.` means "create the app in this folder" (not a new subfolder).
This takes 1–2 minutes. When it's done you'll see a list of files created.

---

## Step 3 — Add the portfolio file

Take `jacob-isrow-portfolio.jsx` (the file Claude gave you) and move it into the `src/` folder of your project.

Your `src/` folder should now contain:
```
src/
  jacob-isrow-portfolio.jsx   ← your file
  App.js                      ← default (we'll edit this)
  index.js
  ... other default files
```

---

## Step 4 — Wire up the app entry point

Open `src/index.js` in any text editor (VS Code, Notepad, etc.)

Find this line:
```js
import App from './App';
```

Change it to:
```js
import App from './jacob-isrow-portfolio';
```

Save the file. You can delete `src/App.js` and `src/App.css` — they're no longer needed.

---

## Step 5 — Add Google Fonts

Open `public/index.html`.

Find the `<head>` section and paste these lines anywhere inside it:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

Also update the `<title>` tag while you're here:
```html
<title>Jacob Isrow — Drummer</title>
```

Save the file.

---

## Step 6 — Run it locally

Back in Terminal:

```bash
npm start
```

Your browser will automatically open `http://localhost:3000`.
You should see the full drum kit portfolio. Test the hover effects and clicks.

To stop the server: press `Ctrl + C` in Terminal.

---

## Step 7 — Customize your content (before going live)

Open `jacob-isrow-portfolio.jsx` in a text editor and update these placeholders:

### Show dates
Search for `"Apr 18"` — you'll find the 4 show boxes. Update each one:
```jsx
{ x: 30,  label: "Apr 18", venue: "The Bowery, NYC" },
{ x: 200, label: "May 3",  venue: "Schuba's, Chicago" },
// etc.
```

### YouTube videos
Search for `dQw4w9WgXcQ` — replace each with your real YouTube video ID.
(The video ID is the part after `?v=` in any YouTube URL)
```jsx
{ id: "YOUR_VIDEO_ID", title: "Your Video Title" },
```

### Contact email
The contact form currently has a placeholder. To make it actually send emails,
sign up free at https://www.emailjs.com, then see **Appendix A** at the bottom
of this guide.

---

## Step 8 — Commit your work to GitHub

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

Your code is now saved to your remote repository.

---

## Step 9 — Deploy to Vercel (makes it live on the internet)

1. Go to https://vercel.com and log in with your GitHub account

2. Click **"Add New Project"**

3. Find your repository in the list and click **"Import"**

4. Vercel will auto-detect it's a React app. Leave all settings as default.

5. Click **"Deploy"**

6. Wait ~2 minutes. When it says "Congratulations!", click **"Visit"**

You'll get a live URL like:
```
https://jacob-isrow-portfolio.vercel.app
```

**Every time you push to GitHub from now on, Vercel auto-deploys the update.**

---

## Step 10 — Connect to Wix

You have two options. Start with Option A.

---

### Option A — Embed as iFrame (easiest, 5 minutes)

This embeds your site inside a Wix page.

1. Open your Wix Editor

2. Click **"+"** (Add Elements) on the left sidebar

3. Go to **Embed & Social → HTML iFrame**

4. Click on the iFrame element that appears on the page

5. In the settings panel, paste your Vercel URL:
   ```
   https://jacob-isrow-portfolio.vercel.app
   ```

6. Resize it to fill the full page (width 100%, height ~700px)

7. In Wix Editor top right, click **"Publish"**

Done — your drum kit portfolio is now live on your Wix domain.

---

### Option B — Use a custom domain (seamless, no "embedded" look)

This makes your portfolio live at `www.yourdomain.com` with no iFrame.

#### In Vercel:
1. Go to your project dashboard on Vercel
2. Click **"Settings" → "Domains"**
3. Type your domain (e.g. `www.jacobisrow.com`) and click **"Add"**
4. Vercel will show you DNS records to add — keep this tab open

#### In Wix:
1. Go to **Wix Dashboard → Domains**
2. Click your domain → **"Advanced Settings" → "DNS Records"**
3. Add the records Vercel gave you:
   - If Vercel gives you an **A record**: add an A record pointing to the IP address
   - If Vercel gives you a **CNAME**: add a CNAME record with the value Vercel gave
4. Click Save

DNS changes take 15 minutes to 24 hours to propagate. After that, your site lives at your custom domain.

> **Note:** With this option, Wix is only managing the domain — the actual site is served by Vercel. You would not use the Wix Editor for page content.

---

## You're done!

Your workflow going forward:
1. Edit `jacob-isrow-portfolio.jsx` locally
2. Run `npm start` to preview changes
3. `git add . && git commit -m "update" && git push` to deploy

Vercel picks up every push automatically.

---

## Appendix A — Wiring up the contact form with EmailJS

EmailJS lets the form send real emails without a backend server. Free for 200 emails/month.

### Setup:
1. Go to https://www.emailjs.com and create a free account
2. Add an **Email Service** (connect your Gmail or any email)
3. Create an **Email Template** — use these variables in the template:
   ```
   From: {{from_name}} ({{from_email}})
   Message: {{message}}
   ```
4. Note down your: **Service ID**, **Template ID**, **Public Key**

### Add to your project:
```bash
npm install @emailjs/browser
```

### Update the contact form in `jacob-isrow-portfolio.jsx`:

At the top of the file, add:
```js
import emailjs from '@emailjs/browser';
```

Find the `handleSubmit` function and replace it with:
```js
const handleSubmit = async () => {
  setSending(true);
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    setSent(true);
  } catch (err) {
    alert('Something went wrong. Please try again.');
  }
  setSending(false);
};
```

Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY` with your real values.

---

## Appendix B — Common errors and fixes

| Error | Fix |
|-------|-----|
| `npx: command not found` | Re-install Node.js from nodejs.org |
| `Cannot find module './jacob-isrow-portfolio'` | Check the filename exactly matches the import in index.js — including capitalization |
| Blank white page | Open browser console (F12 → Console tab) and share the red error |
| Fonts look wrong | Make sure the Google Fonts `<link>` tags are in `public/index.html` inside `<head>` |
| Vercel deploy fails | Check the build log — most common cause is a typo in the import line in index.js |
| iFrame shows blank on Wix | Make sure your Vercel URL starts with `https://` not `http://` |
| Sounds don't play | This is normal until a user clicks something — browsers require a click before playing audio |
