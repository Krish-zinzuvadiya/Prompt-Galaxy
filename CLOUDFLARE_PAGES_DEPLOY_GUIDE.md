# Fast Guide: Deploy Frontend to Cloudflare Pages

Cloudflare Pages is incredibly fast and completely free for React/Vite frontend apps. It connects directly to your GitHub just like Vercel.

**Follow these exact steps to deploy your `frontend` folder:**

### 1. Connect to Cloudflare
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and create a free account.
2. On the left sidebar menu, click **Workers & Pages**.
3. Click the blue **Create application** button, then switch to the **Pages** tab at the top.
4. Click **Connect to Git** and authorize your GitHub account.
5. Select your `prompt-galaxy` repository and click **Begin setup**.

### 2. Configure Build Settings
This part is very important so Cloudflare knows your app is inside the `frontend` folder and uses Vite!

1. **Project name:** `prompt-galaxy`
2. **Production branch:** `master` (or `main`)
3. **Framework preset:** Select **None** (or **Vite** if it appears).
4. **Build command:** `npm run build`
5. **Build output directory:** `dist`
6. **Root directory (Advanced):** Type `/frontend` *(Do not skip this!)*

### 3. Add Environment Variables
1. Scroll down and click **Environment variables (advanced)** to expand it.
2. Click **Add variable**.
3. Under **Variable name**, type exactly: `VITE_API_URL`
4. Under **Value**, paste your live Render Backend URL (e.g., `https://prompt-galaxy-api.onrender.com/api/prompts`).

### 4. Deploy!
Click **Save and Deploy**. Cloudflare will grab your code, install it, and build your React app. 

When it finishes, you will immediately get a lightning-fast live URL that looks like `https://prompt-galaxy.pages.dev/`! 🚀
