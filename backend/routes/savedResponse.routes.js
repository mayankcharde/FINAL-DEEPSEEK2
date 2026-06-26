import express from 'express';
import SavedResponse from '../models/savedResponse.model.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all saved responses for user
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const savedResponses = await SavedResponse.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(savedResponses);
  } catch (error) {
    console.error('Error fetching saved responses:', error);
    res.status(500).json({ error: 'Failed to fetch saved responses' });
  }
});

// Save a new response
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, type, tags } = req.body;
    const userId = req.user._id;

    console.log('Saving response:', { title, content: content?.substring(0, 50), type, userId });

    if (!title || !content) {
      console.log('Missing title or content:', { title: !!title, content: !!content });
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const savedResponse = new SavedResponse({
      userId,
      title: title.substring(0, 200),
      content,
      type: type || 'response',
      tags: tags || []
    });

    await savedResponse.save();
    console.log('Response saved successfully:', savedResponse._id);
    res.status(201).json(savedResponse);
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

// Delete a saved response
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedResponse = await SavedResponse.findOneAndDelete({ _id: id, userId });
    
    if (!deletedResponse) {
      return res.status(404).json({ error: 'Saved response not found' });
    }

    res.json({ message: 'Saved response deleted successfully' });
  } catch (error) {
    console.error('Error deleting saved response:', error);
    res.status(500).json({ error: 'Failed to delete saved response' });
  }
});

// Update a saved response
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userId = req.user._id;

    const updatedResponse = await SavedResponse.findOneAndUpdate(
      { _id: id, userId },
      { 
        title: title?.substring(0, 200),
        content,
        tags,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!updatedResponse) {
      return res.status(404).json({ error: 'Saved response not found' });
    }

    res.json(updatedResponse);
  } catch (error) {
    console.error('Error updating saved response:', error);
    res.status(500).json({ error: 'Failed to update saved response' });
  }
});

export default router;