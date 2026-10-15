# Portfolio

My developer portfolio. It showcases three business systems (invoicing, service desk, inventory), interactive projects with live data and 3D graphics, and AI products. Visitors can ask an assistant questions about my work.

**Live site:** https://your-username.vercel.app ← update after deploying

## Edit
Everything lives in `data/profile.js`: name, links, skills and projects. Screenshots are in `assets/`. Put your CV at `assets/resume.pdf`.

## Run locally
```bash
npx serve .
```

## Deploy
Import this repo on vercel.com and click Deploy. No build settings needed.
The chat works without any setup. To use a real AI model, add the variables from `.env.example` in Vercel's project settings and redeploy.

## Tech
HTML, CSS, vanilla JavaScript (ES modules), one Vercel serverless function (`api/chat.js`).
