// controllers/smsController.js
const Twilio = require('twilio');
const dotenv = require('dotenv');
const { sendTelegramMessage } = require('./telegramBot');
const { incrementSMSCount } = require('../services/metricService');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(accountSid, authToken);

const logSMSDetails = (phoneNumber, messageId) => {
    console.log(`SMS sent to ${phoneNumber} with Message ID: ${messageId}`);
};

const sendSMS = async (req, res) => {
    const { phoneNumber, message, country, operator } = req.body;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!phoneNumber || !message || !country || !operator || !chatId) {
        return res.status(400).json({
            success: false,
            msg: "All fields are mandatory!"
        });
    }

    try {
        const messageResponse = await twilioClient.messages.create({
            body: message,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        logSMSDetails(phoneNumber, messageResponse.sid);

        await incrementSMSCount(country, operator, 'success');

        await sendTelegramMessage(chatId, `SMS sent to ${phoneNumber} by ${operator} (${country}): ${messageResponse.sid}`);

        res.status(200).json({
            success: true,
            msg: 'Message sent successfully!',
            messageId: messageResponse.sid,
        });
    } catch (error) {
        console.error('Error sending SMS:', error.message);

        await incrementSMSCount(country, operator, 'failure');

        res.status(500).json({
            success: false,
            msg: 'Failed to send message',
            error: error.message,
        });

        await sendTelegramMessage(chatId, `Failed to send SMS to ${phoneNumber} by ${operator} (${country}): ${error.message}`);
    }
};

const sendBulkSMS = async (req, res) => {
    const { phoneNumbers, message, country, operator } = req.body;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!phoneNumbers || !message || !country || !operator || !chatId) {
        return res.status(400).json({
            success: false,
            msg: "All fields are mandatory!"
        });
    }

    try {
        const responses = await Promise.all(phoneNumbers.map(async (number) => {
            try {
                const messageResponse = await twilioClient.messages.create({
                    body: message,
                    to: number,
                    from: process.env.TWILIO_PHONE_NUMBER
                });

                logSMSDetails(number, messageResponse.sid);

                await incrementSMSCount(country, operator, 'success');
                return { number, messageId: messageResponse.sid };
            } catch (error) {
                console.error(`Failed to send SMS to ${number}:`, error.message);

                await incrementSMSCount(country, operator, 'failure');
                return { number, error: error.message };
            }
        }));

        await sendTelegramMessage(chatId, `Bulk SMS sent to: ${responses.map(r => r.number).join(', ')}`);

        res.status(200).json({
            success: true,
            msg: 'Bulk messages sent successfully!',
            responses,
        });
    } catch (error) {
        console.error('Error sending bulk SMS:', error.message);
        res.status(500).json({
            success: false,
            msg: 'Failed to send bulk messages',
            error: error.message,
        });
    }
};

const checkMessageStatus = async (req, res) => {
    const { messageId } = req.params || req.body;

    if (!messageId) {
        return res.status(400).json({
            success: false,
            msg: "Message ID is mandatory!"
        });
    }

    try {
        const message = await twilioClient.messages(messageId).fetch();
        res.status(200).json({
            success: true,
            msg: 'Message status retrieved successfully!',
            status: message.status,
        });
    } catch (error) {
        console.error('Error retrieving message status:', error.message);
        res.status(500).json({
            success: false,
            msg: 'Failed to retrieve message status',
            error: error.message,
        });
    }
};

module.exports = { sendSMS, sendBulkSMS, checkMessageStatus };
