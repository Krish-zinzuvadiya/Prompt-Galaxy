const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePositionX: { type: Number, default: 50 },
  imagePositionY: { type: Number, default: 50 },
  platform: { type: String, required: true },
  promptType: { type: String, default: 'ALL' },
  isTrending: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prompt', promptSchema);
