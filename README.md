# 〰 Prompt Galaxy

A high-fidelity, visually stunning AI Prompt library built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring a powerful **Neo-Brutalism** design system.

Prompt Galaxy allows users to discover, filter, and instantly copy high-quality AI prompts, with one-click direct "Try It Now" integrations for ChatGPT, Claude, and Gemini.

---

## ✨ Features

- **Neo-Brutalism Aesthetics**: Bold typography, sharp square edges, high-contrast yellow accents, and thick black drop-shadows inspired by modern UI trends.
- **Masonry Grid Layout**: Fully responsive, dynamic multi-column layout for prompt cards that adapts seamlessly to any screen size.
- **Instant "Try It Now" Execution**: Automatically copies the prompt to your clipboard and opens ChatGPT or Claude with the prompt securely pre-filled via URL parameters, ready to run.
- **Category Filtering**: Interactive tags (`PROFILE / AVATAR`, `SOCIAL MEDIA POST`, etc.) to instantly filter the prompt feed securely.
- **Hidden Admin Dashboard**: A protected `/admin` route complete with a custom login gateway. Admins can seamlessly ADD, EDIT, or DELETE prompts from the live database.
- **Vercel Analytics Tracking**: Built-in `@vercel/analytics` to track live page views and visitor engagement on production.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Vite), React Router DOM, Axios, Vanilla CSS (Custom Neo-Brutalism System).
- **Backend**: Node.js, Express.js, CORS.
- **Database**: MongoDB (Mongoose Native Driver).
- **Deployment**: Vercel (Frontend) and Render (Backend).

---

## 🚀 How to Clone and Run Locally

Follow these steps to get your own version of Prompt Galaxy running on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/prompt-galaxy.git
cd prompt-galaxy
```

### 2. Setup the Backend
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. *(Optional)* If you have a live MongoDB Atlas database, create a `.env` file inside the `backend` folder and add your connection string. Otherwise, it will automatically default to your local mongodb!
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/prompt-galaxy
   ```
4. Start the backend Node server:
   ```bash
   npm start
   ```

### 3. Setup the Frontend
1. Open a **second** terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. View the App!
Navigate to `http://localhost:5173` in your web browser. 

*(To access the Admin panel to add your own prompts, navigate to `http://localhost:5173/admin`)*.
