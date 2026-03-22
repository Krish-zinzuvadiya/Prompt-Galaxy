# Fast Guide: Deploy Frontend to Vercel

1. Go to **Vercel.com** > Add New > **Project**.
2. Connect your GitHub repository and Import the `prompt-galaxy` project.
3. In the Configuration screen:
   - **Root Directory:** Click *Edit* and select the `frontend` folder. *(Critical step!)*
   - **Framework Preset:** Vercel will automatically detect `Vite`.
4. Expand the **Environment Variables** section and add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://prompt-galaxy-api.onrender.com/api/prompts` *(Make sure to use your actual live Render link here!)*
5. Click **Deploy**.

**Done!** Vercel will handle the rest, build the React app, and give you your live URL (e.g., `https://prompt-galaxy.vercel.app`)!
