// routes/smsRoutes.js
const express = require('express');
const { sendSMS, sendBulkSMS, checkMessageStatus } = require('../controllers/smsController');
const authenticate = require('../middleware/authMiddleware'); // Ensure user is authenticated
const router = express.Router();

// Route for sending a single SMS
router.post('/send', authenticate, sendSMS); 

// Route for sending bulk SMS
router.post('/send-bulk', authenticate, sendBulkSMS); 

// Route for checking message status
router.get('/message-status/:messageId', authenticate, checkMessageStatus); 
module.exports = router;
