import express from 'express';
import Favorite from '../models/favorite.model.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all favorites for user
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add to favorites
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, type, sourceId, sourceModel } = req.body;
    const userId = req.user._id;

    console.log('Adding to favorites:', { title, content: content?.substring(0, 50), type, userId });

    if (!title || !content) {
      console.log('Missing title or content:', { title: !!title, content: !!content });
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const favorite = new Favorite({
      userId,
      title: title.substring(0, 200),
      content,
      type: type || 'chat',
      sourceId,
      sourceModel
    });

    await favorite.save();
    console.log('Favorite saved successfully:', favorite._id);
    res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 11000) {
      console.log('Duplicate favorite attempt');
      return res.status(400).json({ error: 'Item already in favorites' });
    }
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Failed to add to favorites' });
  }
});

// Remove from favorites
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedFavorite = await Favorite.findOneAndDelete({ _id: id, userId });
    
    if (!deletedFavorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});

export default router;