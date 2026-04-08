const router = require('express').Router();
const Prompt = require('../models/Prompt');

// GET all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new prompt
router.post('/', async (req, res) => {
  try {
    const { title, content, imageUrl, imagePositionX, imagePositionY, platform, promptType, isTrending } = req.body;
    const newPrompt = new Prompt({ title, content, imageUrl, imagePositionX, imagePositionY, platform, promptType, isTrending: isTrending || false });
    const savedPrompt = await newPrompt.save();
    res.status(201).json(savedPrompt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update prompt
router.put('/:id', async (req, res) => {
  try {
    const { title, content, imageUrl, imagePositionX, imagePositionY, platform, promptType, isTrending } = req.body;
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl, imagePositionX, imagePositionY, platform, promptType, isTrending },
      { new: true }
    );
    res.json(updatedPrompt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE prompt
router.delete('/:id', async (req, res) => {
  try {
    await Prompt.findByIdAndDelete(req.params.id);
    res.json({ message: 'Prompt deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST increment view
router.post('/view/:id', async (req, res) => {
  try {
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(updatedPrompt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
