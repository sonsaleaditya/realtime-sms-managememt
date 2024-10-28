const mongoose = require('mongoose');

const smsMetricsSchema = new mongoose.Schema({
    country: { type: String, required: true },
    smsSent: { type: Number, default: 0 },
    successRates: { type: Number, default: 0 }, // percentage
    errors: { type: Number, default: 0 },
});

module.exports = mongoose.model('SMSMetrics', smsMetricsSchema);
