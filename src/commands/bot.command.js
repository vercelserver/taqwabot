const bot = require("../database/telegram-bot");
const COMMANDS = require("../enum/commands.enum");

// Botni ishga tushirganda "Menu" tugmasini o‘rnatamiz
bot.setMyCommands([
  { command: `${COMMANDS.START}`, description: "🔄 Botni ishga tushirish" },
  { command: `${COMMANDS.REGISTER}`, description: "👤 Ro‘yxatdan o‘tish" },
  { command: `${COMMANDS.PREY_TIME}`, description: "🕌 Bugungi Namoz vaqtlarini ko‘rish" },
  { command: `${COMMANDS.PROFILE}`, description: "👤 Profilni ko‘rish" },
  { command: `${COMMANDS.REMINDER}`, description: "🔔 Eslatmani sozlash" },
  { command: `${COMMANDS.REGION}`, description: "📍Hududni o`zgartirish" },
  { command: `${COMMANDS.HADITH}`, description: "📖 Hadithni ko`rish" },
  { command: `${COMMANDS.RANDOM_HADITH}`, description: "📖 Random hadithni ko`rish" },
  { command: "/quran", description: "📖 Qur’on o‘qish" },
  { command: "/about", description: "ℹ️ Bot haqida" },
])