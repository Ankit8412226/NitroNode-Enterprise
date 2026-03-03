const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apiCalls: { type: Number, default: 0 },
    storageUsed: { type: Number, default: 0 },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

usageSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Usage', usageSchema);
