const { CHAT_ID } = require("./env");
const bot = require("./src/database/telegram-bot");

function checkAccess(msg) {
    return msg.chat.id == CHAT_ID;
}

bot.on("message", (msg) => {
    if (!checkAccess(msg)) return;
    bot.sendMessage(CHAT_ID, "🤖 *Daily Salah bot ishga tushdi!*", { parse_mode: "Markdown" });
});

// remove
console.log("✅ Bot ishlayapti...");