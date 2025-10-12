# Kuai Classroom Frontend

This is a Vite + React frontend for the Kuai Classroom Bank. Drop this `frontend/` folder into your mono-repo and push to GitHub. Render will build the site automatically.

Backend API base (already configured in src/api/kuaiAPI.js):
```
https://website1-v07a.onrender.com/api
```

## Quick local commands
```bash
cd frontend
npm install
npm run dev       # dev server
npm run build     # production build (dist/)
npm run preview   # preview production build
```

## Render Static Site (when fronted lives in /frontend)
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `frontend/dist` (or `dist` depending on how you configure)
