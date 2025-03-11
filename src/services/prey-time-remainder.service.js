const schedule = require("node-schedule");
const axios = require("axios");
const User = require("../models/user");
const bot = require("../database/telegram-bot");
const { scheduleSaharlikReminder, scheduleIftorReminder } = require("./ramadan-remainder.service");
const { NAMOZ_API } = require('../../env');

async function schedulePrayerReminders() {
  const users = await User.find();

  // **Har kuni 00:00 da ishlaydi**
  schedule.scheduleJob("0 0 * * *", async () => {
    try {
      for (const user of users) {
        if (!user.region) continue; // **Agar region sozlanmagan bo‘lsa, tashlab ketamiz**

        // **Foydalanuvchi shahriga qarab API dan so‘rov yuboramiz**
        const response = await axios.get(`${NAMOZ_API}/day?region=${user.region}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          return bot.sendMessage(user.userId, "⚠️ Hududni topilmadi", { parse_mode: "Markdown" });
        }
        const { region, date, weekday, hijri_date, times } = response.data;


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
🙏 *Alloh ibodatlaringizni qabul qilsin!*
`.trim();

        // **Foydalanuvchiga jo‘natamiz**
        bot.sendMessage(user.userId, message, { parse_mode: "Markdown" });

        // **Namoz vaqti kirganida va oldin eslatma**
        sendPrayerNotifications(times, user);

        if (hijri_date.month == "Ramazon") {
          scheduleSaharlikReminder(user, data);
          scheduleIftorReminder(user, data);
        }
      }

    } catch (error) {
      console.error("❌ Namoz vaqtlarini olishda xatolik:", error);
    }
  });
}

function sendPrayerNotifications(times, user) {
  const prayerTimes = {
    "Bomdod": times.tong_saharlik,
    "Quyosh": times.quyosh,
    "Peshin": times.peshin,
    "Asr": times.asr,
    "Shom": times.shom_iftor,
    "Xufton": times.hufton,
  };

  Object.entries(prayerTimes).forEach(([prayer, time]) => {
    if (!time) return;

    const [hour, minute] = time.split(":").map(Number);

    // **Namoz vaqti kirganda eslatma**
    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0);

    schedule.scheduleJob(prayerTime, () => {
      bot.sendMessage(user.userId, `🕌 *${prayer} vaqti kirdi!* Alloh ibodatlaringizni qabul qilsin!`, {
        parse_mode: "Markdown"
      });
    });

    // **Namozdan oldin eslatma (`user.reminderBefore` bo‘yicha)**
    if (user.reminderBefore > 0) {
      const reminderTime = new Date(prayerTime);
      reminderTime.setMinutes(reminderTime.getMinutes() - user.reminderBefore); // Foydalanuvchi belgilagan daqiqalar oldin

      schedule.scheduleJob(reminderTime, () => {
        bot.sendMessage(user.userId, `⏳ *${prayer} namoziga ${user.reminderBefore} daqiqa qoldi!* Tayyorgarlik ko‘ring.`, {
          parse_mode: "Markdown"
        });
      });
    }
  });
}

module.exports = { schedulePrayerReminders };
