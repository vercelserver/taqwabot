const { default: axios } = require("axios");
const bot = require("../database/telegram-bot");
const { NAMOZ_API } = require('../../env');

async function dailyPreyTime(user) {

    const response = await axios.get(`${NAMOZ_API}/day?region=${user.region}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status !== 200) {
        return bot.sendMessage(user.userId, "⚠️ Hudud topilmadi. Iltimos, sozlamalarda hududingizni to‘g‘ri kiriting.", { parse_mode: "Markdown" });
    }

    const data = response.data;
    if (!data) {
        return bot.sendMessage(user.userId, "⚠️ Ma'lumotlarni olishda xatolik yuz berdi.");
    }

    const { region, date, weekday, hijri_date, times } = data;

    // **Xabarni tayyorlaymiz**
    const message = `
📅 *Sana:* ${date} (${weekday})
📅 *Hijriy Sana:* ${hijri_date.day} ${hijri_date.month}
📍 *Hudud:* ${region}

🕌 *Bugungi namoz vaqtlari:*
\`\`\`
🌅 Tong Saharlik : ${times.tong_saharlik}
☀️ Quyosh        : ${times.quyosh}
🕌 Peshin        : ${times.peshin}
🌇 Asr           : ${times.asr}
🌆 Shom Iftor   : ${times.shom_iftor}
🌙 Hufton       : ${times.hufton}
\`\`\`
🤲 *Alloh ibodatlaringizni qabul qilsin!*
`.trim();

    bot.sendMessage(user.userId, message, { parse_mode: "Markdown" });
}

module.exports = { dailyPreyTime };