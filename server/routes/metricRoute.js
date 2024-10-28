// routes/metricRoute.js
const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { fetchMetrics } = require('../controllers/smsMetricsController'); // Update import

const router = express.Router();

router.get('/fetch-sms-metrics', authenticate, fetchMetrics); // Use fetchMetrics here

module.exports = router;
