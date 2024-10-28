// config/mysqlDb.js
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER, // Replace with your MySQL username
    password: process.env.PASSWORD, // Replace with your MySQL password
    database: process.env.DATABASE // Replace with your MySQL database name
});

// Create the metrics table
const createMetricsTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS sms_metrics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        country VARCHAR(100) NOT NULL,
        operator VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        sms_sent INT DEFAULT 0,
        success_rates FLOAT DEFAULT 0,
        errors INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE (country, operator, date)
    )
    `;

    connection.query(query, (err) => {
        if (err) {
            console.error('Error creating table:', err); // Log the error if table creation fails
            throw err;
        }
        console.log('SMS Metrics table created or already exists.');
    });
};

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        return console.error('Error connecting: ' + err.stack);
    }
    console.log('Connected as id ' + connection.threadId);
    createMetricsTable();
});

// Export the connection
module.exports = connection; // Export the connection object directly
