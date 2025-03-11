const { addUser, getUser, updateUserSettings } = require('../controllers/user.controller');
const bot = require('../database/telegram-bot');
const { dailyPreyTime } = require('../services/daily-prey-time.service');
const regionsData = require('../data/regions.json');
const messages = require('../services/messages');
const COMMANDS = require('../enum/commands.enum');
const { randomHadith, books_slug, fetchHadithByBook } = require('../services/hadith.service');

module.exports = function () {

    bot.onText(new RegExp(`^${COMMANDS.START}$`), async (msg) => {
        const { id: userId, first_name: firstName } = msg.from;
        bot.sendMessage(userId, messages.welcomeMessage(firstName), { parse_mode: "Markdown" });
    });

    bot.onText(new RegExp(`^${COMMANDS.REGISTER}$`), async (msg) => {
        const { id, first_name } = msg.from;

        try {
            const existingUser = await getUser(id);

            if (existingUser) {
                return bot.sendMessage(id, messages.alreadyRegistered, { parse_mode: "Markdown" });
            }

            const user = await addUser(msg.from);
            bot.sendMessage(id, messages.registrationSuccess(first_name, user.points), { parse_mode: "Markdown" });
        } catch (error) {
            console.error("❌ Ro‘yxatdan o‘tishda xatolik:", error);
            bot.sendMessage(id, "⚠️ Xatolik yuz berdi. Qayta urinib ko‘ring.");
        }
    });

    bot.onText(new RegExp(`^${COMMANDS.PROFILE}$`), async (msg) => {
        const user = await getUser(msg.chat.id);

        if (!user) {
            return bot.sendMessage(msg.chat.id, messages.userNotFound);
        }

        bot.sendMessage(msg.chat.id, messages.profileText(user), { parse_mode: "Markdown" });
    });

    bot.onText(new RegExp(`^${COMMANDS.REGION}$`), async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        try {
            const currentUser = await getUser(userId);
            if (!currentUser) {
                return bot.sendMessage(chatId, messages.userNotFound);
            }

            bot.sendMessage(chatId, messages.selectRegion, {
                reply_markup: {
                    keyboard: regionsData.regions.map(region => [region]).sort(),
                    one_time_keyboard: true,
                    resize_keyboard: true,
                },
            });

            bot.once("message", async (regionMsg) => {
                const selectedRegion = regionMsg.text;

                if (!regionsData.regions.includes(selectedRegion)) {
                    return bot.sendMessage(chatId, messages.invalidRegion);
                }

                await updateUserSettings(userId, { region: selectedRegion });
                bot.sendMessage(chatId, messages.regionUpdated(selectedRegion), { parse_mode: "Markdown" });
            });
        } catch (error) {
            console.error("❌ Sozlamalar xatosi:", error);
            bot.sendMessage(chatId, "❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        }
    });

    bot.onText(new RegExp(`^${COMMANDS.REMINDER}$`), async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        bot.sendMessage(chatId, messages.enterReminderTime, { parse_mode: "Markdown" });

        bot.once("message", async (reminderMsg) => {
            const reminderBefore = parseInt(reminderMsg.text);

            if (isNaN(reminderBefore) || reminderBefore < 0) {
                return bot.sendMessage(chatId, messages.invalidReminder, { parse_mode: "Markdown" });
            }

            await updateUserSettings(userId, { reminderBefore });

            const responseMessage = reminderBefore === 0 ? messages.reminderDisabled : messages.reminderUpdated(reminderBefore);
            bot.sendMessage(chatId, responseMessage, { parse_mode: "Markdown" });
        });
    });

    bot.onText(new RegExp(`^${COMMANDS.PREY_TIME}$`), async (msg) => {
        const user = await getUser(msg.from.id);

        if (!user) {
            return bot.sendMessage(msg.chat.id, messages.userNotFound);
        }

        if (!user.region) {
            return bot.sendMessage(msg.chat.id, messages.regionNotSet);
        }

        try {
            await dailyPreyTime(user);
        } catch(error) {
            console.error("❌ Namoz vaqtini olishda xatolik yuz berdi:", error);
            bot.sendMessage(msg.chat.id, "❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        }
    });

    bot.onText(new RegExp(`^${COMMANDS.RANDOM_HADITH}$`), async (msg) => {
        try {
            const {data} = await randomHadith();
            bot.sendMessage(msg.chat.id, messages.hadithMessage(data), { parse_mode: "HTML" });
        } catch (error) {
            console.error("❌ Random hadithni olishda xatolik yuz berdi:", error);
            bot.sendMessage(msg.chat.id, "❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        }
    });

    const bookButtons = {
        reply_markup: {
            inline_keyboard: books_slug.map(book => [
                {
                    text: `${book.name} 📖 (${book.limit})`, 
                    callback_data: `hadith_${book.slug}`
                }
            ])
        }
    };
    
    bot.onText(new RegExp(`^${COMMANDS.HADITH}$`), (msg) => {
        bot.sendMessage(msg.chat.id, "📚 Hadis kitobini tanlang:", bookButtons);
    });

    const userState = {}; // Foydalanuvchining tanlovini saqlash uchun

    bot.on("callback_query", async (query) => {
        const chatId = query.message.chat.id;
        const data = query.data;
    
        if (data.startsWith("hadith_")) {
            const bookSlug = data.replace("hadith_", ""); 
            const book = books_slug.find(b => b.slug === bookSlug);
    
            if (!book) {
                return bot.sendMessage(chatId, "⚠️ Xatolik: Kitob topilmadi.");
            }
    
            // Foydalanuvchi holatini saqlaymiz (tanlangan kitob)
            userState[chatId] = { bookSlug, book };
    
            bot.sendMessage(chatId, `📖 *${book.name}* dan hadis raqamini kiriting (1-${book.limit})`, {
                parse_mode: "Markdown"
            });
        }
    
        bot.answerCallbackQuery(query.id); // Loading efektini yo'q qilish
    });
    
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.trim();
    
        if (!userState[chatId]) return; // Agar foydalanuvchi hali kitob tanlamagan bo‘lsa, hech narsa qilmaymiz
    
        const { bookSlug, book } = userState[chatId];
    
        if (isNaN(text) || text < 1 || text > book.limit) {
            return bot.sendMessage(chatId, `❌ Iltimos, faqat 1 dan ${book.limit} gacha bo‘lgan son kiriting.`);
        }
    
        try {
            const {data} = await fetchHadithByBook(book, Number(text));
            bot.sendMessage(msg.chat.id, messages.hadithMessage(data), { parse_mode: "HTML" });
        } catch (error) {
            console.error("❌ Random hadithni olishda xatolik yuz berdi:", error);
            bot.sendMessage(msg.chat.id, "❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        }

        delete userState[chatId]; // Foydalanuvchi jarayonini tozalash
    });

};
