const express = require('express');
const router = express.Router();
const { enhanceResume } = require('../services/gemini');

router.post('/', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  try {
    const enhanced = await enhanceResume(resumeText, jobDescription);
    res.json({ enhancedResume: enhanced, tips: [] }); // We'll add tips later
  } catch (err) {
    console.error('Enhancement error:', err);
    res.status(500).json({ error: 'Resume enhancement failed.' });
  }
});

module.exports = router;
