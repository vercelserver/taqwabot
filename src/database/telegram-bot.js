const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../../env"); // Tokenni env dan olish

const bot = new TelegramBot(TOKEN, {
  polling: true, // Bot xabarlarni qabul qilsin
});

bot.on("polling_error", (err) => console.log(`❌ Telegram polling xatosi: ${err.message}`));

module.exports = bot;
