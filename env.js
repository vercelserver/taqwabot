require("dotenv").config();

module.exports = {
    TOKEN: process.env.BOT_TOKEN,
    MONGODB_URL: process.env.MONGO_URI,
    CHAT_ID: process.env.CHAT_ID,
    NAMOZ_API: process.env.NAMOZ_API
}