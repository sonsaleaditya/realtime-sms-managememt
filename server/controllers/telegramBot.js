const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN; // Your bot token from BotFather
const bot = new TelegramBot(token, { polling: true });

// Function to send message
const sendTelegramMessage = async (chatId, message) => {
    try {
        await bot.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
};

// Listen for commands (optional)
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Welcome to the SMS Management Bot! Your chat ID is: ${chatId}`);
});

// Other command handlers can be added here

module.exports = { sendTelegramMessage };
