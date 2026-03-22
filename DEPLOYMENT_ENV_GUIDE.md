# Connecting Your MongoDB and Render Links

Since the code is already built with production in mind, **you do NOT need to change any code in the backend or frontend files!** 

Instead of hardcoding your private MongoDB URL or Render link directly into the code (which is insecure and bad practice), we pass them secretly using **Environment Variables**. Here is exactly how and where to put them:

---

## 1. Where to put the MongoDB URL in the Backend
Your `server.js` file is already written to automatically look for a secret variable called `MONGO_URI`. 

**Steps for Render (Backend):**
1. Go to your Render Dashboard and click on your Web Service (your backend).
2. On the left sidebar, click **Environment**.
3. Click **Add Environment Variable**.
4. Enter the details:
   - **Key:** `MONGO_URI`
   - **Value:** *(Paste your full MongoDB Atlas connection string here, including your password)*
5. Click **Save Changes**.
6. Render will automatically restart your server, and your backend will now successfully talk to MongoDB Atlas!

*(Note: If you run it locally on your PC, it will just fallback to your local `mongodb://localhost:27017` automatically!)*

---

## 2. Where to put the Render URL in the Frontend
Your `Home.jsx` and `Admin.jsx` files are already written to automatically look for a secret variable called `VITE_API_URL` when they are deployed online.

**Steps for Vercel (Frontend):**
1. Once your backend is live on Render, copy its public URL. It will look something like `https://prompt-galaxy-api.onrender.com`.
2. Add `/api/prompts` to the end of it so it looks exactly like this:
   `https://prompt-galaxy-api.onrender.com/api/prompts`
3. Go to your Vercel Dashboard and click on your frontend project.
4. Click on **Settings** in the top menu, then click **Environment Variables** on the left.
5. Create a new variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://prompt-galaxy-api.onrender.com/api/prompts` *(Replace with your actual Render URL)*
6. Click **Save**.
7. **CRITICAL STEP:** Whenever you add a new environment variable in Vercel, you must redeploy for it to take effect! Go to the **Deployments** tab, click the three dots (`...`) next to your latest deployment, and select **Redeploy**.

Once Vercel finishes rebuilding, your live frontend will officially be talking to your live backend on Render! 🚀
