// controllers/smsMetricsController.js
const { getMetrics} = require('../services/metricService');

const fetchMetrics = async (req, res) => {
    try {
        const metrics = await getMetrics();
        res.status(200).json({ success: true, metrics });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Failed to fetch metrics', error });
    }
};

module.exports = {
    fetchMetrics
     
};
