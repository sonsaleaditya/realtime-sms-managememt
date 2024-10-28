const mongoose = require('mongoose');

const programConfigSchema = new mongoose.Schema({
    country: { type: String, required: true },
    operator: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // Indicates if the pair is active
    isHighPriority: { type: Boolean, default: false }, // Indicates high-priority status
    sessionDetails: {
        sessionId: { type: String, required: true }, // Unique session identifier
        createdAt: { type: Date, default: Date.now }, // When the session was created
    },
});

module.exports = mongoose.model('ProgramConfig', programConfigSchema);
