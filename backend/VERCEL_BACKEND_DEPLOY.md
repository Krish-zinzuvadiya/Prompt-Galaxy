# Vercel Deployment: Final Checklist & Steps ✅

I have already completed the code changes for you (**Step 1 & 2**). Now you just need to follow these steps in the Vercel Dashboard.

## 🏁 Already Done by Me:
- [x] **Created `vercel.json`**: Configured your app for Serverless Functions.
- [x] **Updated `server.js`**: Exported the `app` so Vercel can run it.

## 🚀 Your Next Steps (Vercel UI):

### 1. Push to GitHub
Open your terminal and run:
```bash
git add .
git commit -m "Configure backend for Vercel deployment"
git push origin main
```

### 2. Import to Vercel
1.  Go to [vercel.com/new](https://vercel.com/new).
2.  Import your GitHub repository.
3.  **ROOT DIRECTORY**: If your backend is in a subfolder, make sure to select the `backend` folder during setup.

### 3. Environment Variables (CRITICAL!)
Vercel needs your database connection string. In the Vercel Dashboard:
1.  Go to **Settings** -> **Environment Variables**.
2.  Add **`MONGO_URI`**: Copy your MongoDB string from your local `.env`.
3.  Add **`PORT`**: `5000` (optional, as Vercel handles this).
4.  Add any other variables you have in your backend `.env`.

### 4. Deploy 
Click **Deploy**. Once it's finished, Vercel will give you a **Live URL** (e.g., `https://prompt-galaxy-api.vercel.app`).

### 5. Final Move (Frontend Update)
Update your Frontend's `.env` or `VITE_API_URL` to point to this new Vercel URL.

---

### Why this fixes your Render problem?
Render's free tier "sleeps" after 15 mins. Vercel's Serverless Functions start up **instantly** when called, so your "server" is never really "down".
