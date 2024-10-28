const mongoose = require('mongoose');

const countryOperatorSchema = new mongoose.Schema({
    country: { type: String, required: true },
    operator: { type: String, required: true },
    isHighPriority: { type: Boolean, default: false },
});

module.exports = mongoose.model('CountryOperator', countryOperatorSchema);
