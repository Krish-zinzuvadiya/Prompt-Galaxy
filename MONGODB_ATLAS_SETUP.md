# MongoDB Atlas Setup Guide

This guide will walk you through exactly how to set up your free cloud database on MongoDB Atlas for **Prompt Galaxy**, so you can connect it to your Render backend via the `MONGO_URI` environment variable.

## Step 1: Create an Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Sign up for a free account (you can use your Google account for quick access).
3. Once logged in, you might be asked a few survey questions. You can skip them or select "Learn MongoDB" and "JavaScript/Node.js" as your language.

## Step 2: Build a Cluster (Your Database)
1. You will be prompted to "Deploy a cloud database".
2. Select the **M0 FREE** tier. It is completely free forever.
3. Choose a provider (AWS, Google Cloud, or Azure) and a region closest to you. The default choice is usually fine.
4. Keep the cluster name as `Cluster0` (or name it `PromptGalaxyCluster` if you prefer).
5. Click **Create Deployment** (or **Create Developer Cluster**).

## Step 3: Create a Database User
1. After creating the cluster, Atlas will ask "How would you like to authenticate your connection?".
2. Choose **Username and Password**.
3. Enter a Username (e.g., `krish`).
4. Enter a secure Password. **Important:** Do not use special characters like `@` or `:` in your password as it can break the connection string format later.
5. Click **Create User**.

## Step 4: Whitelist Your IP Address (Network Access)
1. Below the user creation, it will ask "Where would you like to connect from?".
2. Click **My Local Environment**.
3. Under "IP Address", look for the button that says **Allow Access from Anywhere**. 
   *(Note: Setting it to Anywhere (`0.0.0.0/0`) ensures your local computer and the Render production server can both connect to it without getting blocked).*
4. Click **Add IP Address**.
5. Click **Finish and Close** at the bottom.

## Step 5: Get Your Connection String
1. You should now be on your main Database Deployments dashboard showing your Cluster.
2. Click the **Connect** button next to your cluster name.
3. A popup will appear. Click **Drivers**.
4. In the "Driver" dropdown, ensure **Node.js** is selected.
5. In Step 3, you will see your connection string. It will look something like this:
   `mongodb+srv://krish:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
6. **Copy this entire string.**

## Step 6: Finalizing the URL
1. Paste the string you copied into a notepad.
2. Replace `<password>` with the actual password you created in Step 3.
   *Example: If your password is `apple123`, the string becomes:*
   `mongodb+srv://krish:apple123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
3. Optional but recommended: Before the `?` question mark, insert the name of your specific database, e.g., `prompt-galaxy`. 
   `...mongodb.net/prompt-galaxy?retryWrites=true...`

## Step 7: Use it in Render
1. Go to your backend's settings in **Render**.
2. Find the **Environment Variables** section.
3. Add a new variable:
   - **Key:** `MONGO_URI`
   - **Value:** *(Paste your finalized connection string here)*
4. Save the variable and let Render rebuild/restart your server. Your live backend is now connected to your live database!
