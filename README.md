# Chai Adda — starter template

A small nostalgia-themed music site, built the same way as sites like
saloon.wtf: plain HTML, CSS, and JavaScript, no framework or backend
required.

## What's here
- `index.html` — page structure
- `style.css` — palette, type, the kettle/kulhad "pouring" player
- `script.js` — playlist logic, play/pause, volume, track selector
- `audio/` — drop your mp3 files in here

## Run it locally
Any static server works. Easiest option:
1. Open the folder in VS Code
2. Install the "Live Server" extension, right-click `index.html` → "Open with Live Server"

Or from a terminal in this folder:
```
python3 -m http.server 8000
```
then open http://localhost:8000

## Make it yours
- Edit the `TRACKS` array in `script.js` with your own titles and file paths
- Change the colors in the `:root` block at the top of `style.css`
- Swap the headline, ticker text, and footer copy in `index.html`
- The kulhad (clay cup) fills up as the song plays — that's driven by the
  `timeupdate` listener in `script.js`, tied to `audio.currentTime`

## Deploy for free
Pick one:
- **Netlify** — drag the whole folder onto app.netlify.com/drop
- **Vercel** — `npx vercel` from inside this folder, follow the prompts
- **GitHub Pages** — push this folder to a repo, enable Pages in repo settings
- **Cloudflare Pages** — connect a GitHub repo, or drag-and-drop deploy

All four have generous free tiers and give you a live URL in under a minute.
Buy a custom domain (e.g. from Namecheap or Porkbun) once you're happy with it,
then point it at your host.
