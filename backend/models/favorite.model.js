import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['chat', 'image-analysis', 'saved-response', 'template'],
    default: 'chat'
  },
  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'sourceModel'
  },
  sourceModel: {
    type: String,
    enum: ['Chat', 'SavedResponse', 'Template']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure user can't favorite the same item twice
favoriteSchema.index({ userId: 1, sourceId: 1, sourceModel: 1 }, { unique: true, sparse: true });

export default mongoose.model('Favorite', favoriteSchema);