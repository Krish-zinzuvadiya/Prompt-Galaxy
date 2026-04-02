# 🚀 Prompt Galaxy - Bulk Upload Guide

Agar aapke paas bohot saare prompts hain aur aap unko ek-ek karke `Admin Panel` se add nahi karna chahte, toh aap inme se koi bhi method use kar sakte hain. Sabse aasan aur fast **Method 1 (MongoDB Compass)** ya **Method 2 (Seed Script)** hai.

---

## Method 1: MongoDB Compass ke through Upload (No Coding Required & Fastest)
Agar aap technical kaam nahi karna chahte aur sidha data dalna chahte hain, toh ye method best hai.

**Step 1:** Ek JSON file banayein (`prompts_data.json` ke naam se).
Usme apne saare prompts is format me daalein:

```json
[
  {
    "title": "SEO Blog Post Generator",
    "content": "Write a highly SEO optimized blog post about [Topic] targeting the keyword [Keyword]...",
    "imageUrl": "data:image/jpeg;base64,...", 
    "platform": "ChatGPT",
    "promptType": "Writing"
  },
  {
    "title": "Creative Story Prompt",
    "content": "Write a creative story exploring the themes of sci-fi and magic...",
    "imageUrl": "https://example.com/someimage.jpg",
    "platform": "Midjourney",
    "promptType": "Creative"
  }
]
```
*(Aap chahe toh Excel sheet banakar usko `.csv` file format me bhi save kar sakte hain)*

**Step 2:** MongoDB Compass open karein.
**Step 3:** Apne `prompt-galaxy` database se connect karein.
**Step 4:** `prompts` collection par click karein.
**Step 5:** Upar "Add Data" ka button hoga, uspe hover karke **"Import JSON or CSV file"** par click karein.
**Step 6:** Apni file select karein aur "Import" daba dein. 
Aapke saare prompts instantly add ho jayenge! 🎉

---

## Method 2: Node.js Seed Script ke zariye Local Photos/Images ke sath (Developer Way)
Agar aap chahte hain ki ek script banakar aap backend se commands chala kar seedha database me entry kardo aur apne computer ki local photos ko Base64 banakar directly upload bhi kardo.

**Step 1:** `backend` folder ke andar ek naya folder banayein jiska naam ho `images` aur usme apni saari photos (`.jpg`, `.png`, etc.) daal dein.

**Step 2:** `backend` folder ke andar ek nayi file banaiye jiska naam rakho `seed.js`.

**Step 3:** Us file me ye code copy-paste karein:

```javascript
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Prompt = require('./models/Prompt'); // Aapka Prompt model
require('dotenv').config();

// Ek function banate hain jo local image ko base64 format me convert karega
const getBase64Image = (fileName) => {
  // 'images' folder jahan aapne photos rakhi hain
  const imagePath = path.join(__dirname, 'images', fileName); 
  if (fs.existsSync(imagePath)) {
    const fileData = fs.readFileSync(imagePath);
    const extension = path.extname(fileName).replace('.', ''); // Ex: png ya jpg nikalega
    return `data:image/${extension};base64,${fileData.toString('base64')}`;
  } else {
    console.log(`⚠️ Image not found: ${fileName}`);
    return ""; // agar image nai mili toh khaali string
  }
};

// YAHAN APNE SAARE PROMPTS DAALEIN 👇
const myPrompts = [
  {
    title: "Email Marketing Copy",
    content: "Write a high-converting email marketing copy for...",
    imageUrl: getBase64Image("email_marketing.png"), // <-- Apni photo ka naam yahan dalein
    platform: "ChatGPT",
    promptType: "Marketing"
  },
  {
    title: "Logo Design Idea",
    content: "Design a logo for a modern tech startup focused on AI...",
    imageUrl: getBase64Image("logo_design.jpg"), // <-- Apni photo ka naam yahan dalein
    platform: "DALL-E",
    promptType: "Design"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/prompt-galaxy')
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    try {
      await Prompt.insertMany(myPrompts);
      console.log('✅ Sabhi Prompts aur images successfully add ho gaye!');
      process.exit();
    } catch (err) {
      console.error('❌ Data insert karne me error aaya:', err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
```

**Step 4:** Ab apne terminal/command prompt me `backend` folder me jaayein aur run karein:
```bash
cd backend
node seed.js
```
Aapka data success message aane ke baad upload aur update ho jayega!

---

## Method 3: Future me "Bulk Import Feature" in Admin Panel banvayein
Agar aapko baar-baar excel ya json upload karna padta hai, toh aap apne admin portal frontend me ek **"Upload CSV / JSON" button** ki request kar sakte hain:
1. Usme me `.csv` file accept karwaunga.
2. Us file ka data parse hoke frontend se sedha backend API me push hoga.
3. Ek single click me data add ho jayega.

*Agar aap admin panel me ye bulk upload button or feature add karwana chahte hain directly frontend se, toh aap bas mujhe bol do main abhi likh dunga wo code!*
