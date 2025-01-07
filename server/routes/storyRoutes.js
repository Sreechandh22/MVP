const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createStory,
  getAllStories,
  getSingleStory
} = require('../controllers/storyController');

// Public route (GET all stories)
router.get('/', getAllStories);
// Public route (GET single story)
router.get('/:id', getSingleStory);

// Protected route (POST create story)
router.post('/', authMiddleware, createStory);

module.exports = router;
