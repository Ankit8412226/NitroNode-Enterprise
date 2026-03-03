const mongoose = require('mongoose');
const { AUDIT_ACTIONS } = require('../../common/constants');

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, enum: Object.values(AUDIT_ACTIONS), required: true },
    resource: { type: String, required: true },
    resourceId: { type: String },
    ip: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
