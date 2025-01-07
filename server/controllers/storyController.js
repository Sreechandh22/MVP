const Story = require('../models/Story');

exports.createStory = async (req, res) => {
  try {
    const { title, content, coverImageUrl, genre } = req.body;
    // user info comes from authMiddleware if logged in
    const authorId = req.user.userId;

    const newStory = new Story({
      title,
      content,
      coverImageUrl,
      genre,
      author: authorId
    });

    const savedStory = await newStory.save();
    return res.status(201).json(savedStory);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate('author', 'username');
    return res.json(stories);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSingleStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id).populate('author', 'username');
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    return res.json(story);
  } catch (error) {
    console.error('Get single story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
