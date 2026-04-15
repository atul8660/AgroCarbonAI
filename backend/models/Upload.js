const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  metadata: {
    hasExif: Boolean,
    exifData: mongoose.Schema.Types.Mixed,
    extractedAt: Date
  },
  biomassEstimate: {
    value: Number,
    unit: String,
    confidence: Number,
    processedAt: Date
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'completed', 'failed'],
    default: 'uploaded'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  location: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('Upload', uploadSchema);