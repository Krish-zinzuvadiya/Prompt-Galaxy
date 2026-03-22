# Fast Guide: Deploy Backend to Render

1. Go to **Render.com** > New+ > **Web Service**.
2. Connect your GitHub repository.
3. Configure these exact settings:
   - **Name:** `prompt-galaxy-api`
   - **Root Directory:** `backend` *(Critical: Don't skip this!)*
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Expand the **Environment Variables** section and add two keys:
   - Add Key: `PORT` | Value: `5000`
   - Add Key: `MONGO_URI` | Value: *(Paste your full MongoDB Atlas connection string here)*
5. Click **Create Web Service**.

**Done!** Wait a couple of minutes for it to build. Once it's live, copy the generated URL (e.g., `https://prompt-galaxy-api.onrender.com`) – you will need this link for your frontend in Vercel!
