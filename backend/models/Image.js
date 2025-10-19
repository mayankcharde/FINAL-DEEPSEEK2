import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },  // base64 or image URL
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Image', ImageSchema);