const express = require('express');
const http = require('http'); // Import http to create the server
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Moved to the top for clarity
const authRoutes = require('./routes/auth');
const processRoutes = require('./routes/processRoutes');
const countryOperatorRoutes = require('./routes/countryOperatorRoutes');
const smsRoutes = require('./routes/smsRoute');
const metricRoute = require('./routes/metricRoute');
const { setupWebSocket } = require('./websocket'); // Import the WebSocket setup function
const rateLimit = require('./middleware/rateLimit');

const app = express();
const port = process.env.PORT || 5000; // Ensure the port is set correctly
const server = http.createServer(app);

// Import and connect to databases
const mysqlConnect = require('./config/mysqlDb');
const mongoConnect = require('./config/mongoDb');
mongoConnect(); // Make sure your MongoDB connection is working

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit); // Use rate limiting middleware

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));



 //app.use(cors());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/process', processRoutes); // Register process management routes
app.use('/api/country-operators', countryOperatorRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/sms-metrics', metricRoute);

// Setup WebSocket server
setupWebSocket(server);

// Start the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
