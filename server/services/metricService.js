// services/metricService.js
 const mysqlConnection = require('../config/mysqlDb'); // Import the connection object

 const incrementSMSCount = async (country, operator, success) => {
    const timestamp = new Date(); // Get the current timestamp

    // Update MySQL with the date included
    const query = `
    INSERT INTO sms_metrics (country, operator, sms_sent, success_rates, errors, date)
    VALUES (?, ?, 1, ?, 0, ?)
    ON DUPLICATE KEY UPDATE 
        sms_sent = sms_sent + 1,
        success_rates = success_rates + ?,
        date = ?  -- Optionally update the date as well
    `;

    mysqlConnection.query(query, [country, operator, success ? 1 : 0, timestamp, success ? 1 : 0, timestamp], (err, result) => {
        if (err) {
            console.error('Error inserting/updating MySQL metrics:', err);
            return;
        }
        console.log('MySQL metrics updated for country:', country, 'operator:', operator, 'Result:', result);
    });
};

const getMetrics = async () => {
    const query = `SELECT * FROM sms_metrics`;
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching SMS metrics:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Export both increment and fetch methods
module.exports = { incrementSMSCount, getMetrics };