const mongoose = require('mongoose');
const { TOKEN_TYPES } = require('../../common/constants');

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: [TOKEN_TYPES.REFRESH], required: true },
    expires: { type: Date, required: true },
    blacklisted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Token', tokenSchema);
