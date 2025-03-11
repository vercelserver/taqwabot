const schedule = require("node-schedule");
const bot = require("../database/telegram-bot");

/**
 * 📌 SAHARLIK eslatmasi (20 daqiqa oldin)
 */
function scheduleSaharlikReminder(user, todayInfo) {
    const saharlikTime = todayInfo.times.tong_saharlik;
    if (!saharlikTime) return;

    const [hour, minute] = saharlikTime.split(":").map(Number);
    const reminderTime = new Date();
    reminderTime.setHours(hour, minute - 10, 0);

    schedule.scheduleJob(reminderTime, () => {
        const message = `
📅 *Sana:* ${todayInfo.date} (${todayInfo.weekday})
📅 *Hijriy Sana:* ${todayInfo.hijri_date.day} ${todayInfo.hijri_date.month}
📍 *Hudud:* ${todayInfo.region}

🌙 *Saharlik vaqti yaqinlashdi!* 20 daqiqa qoldi.

📖 *Og'iz yopish duosi:*
🔹 *Arabcha:*  
  _نَوَيْتُ أَنْ أَصُومَ صَوْمَ شَهْرِ رَمَضَانَ مِنَ الْفَجْرِ إِلَى الْمَغْرِبِ خَالِصًا لِلّٰهِ تَعَالَى اللَّهُ أَكْبَرُ_  

🔹 *O‘zbekcha:*  
  *Navaytu an asuma sovma shahri ramazona minal fajri ilal mag‘ribi, xolisan lillahi ta’ala. Allohu akbar.*  

🔹 *Ma’nosi:*  
  *Ramazon oyining ro‘zasini subhdan to kun botguncha tutmoqni niyat qildim. Xolis Alloh uchun. Alloh buyukdir.*
        `.trim();

        bot.sendMessage(user.userId, message, { parse_mode: "Markdown" });
    });
}

/**
 * 📌 IFTOR eslatmasi
 */
function scheduleIftorReminder(user, todayInfo) {
    const iftorTime = todayInfo.times.shom_iftor;
    if (!iftorTime) return;

    const [hour, minute] = iftorTime.split(":").map(Number);
    const reminderTime = new Date();
    reminderTime.setHours(hour, minute, 0);

    schedule.scheduleJob(reminderTime, () => {
        const message = `
📅 *Sana:* ${todayInfo.date} (${todayInfo.weekday})
📅 *Hijriy Sana:* ${todayInfo.hijri_date.day} ${todayInfo.hijri_date.month}
📍 *Hudud:* ${todayInfo.region}

🌆 *Iftor vaqti kirdi!* Alloh tutgan ro‘zalaringizni qabul qilsin!

📖 *Og'iz ochish duosi:*
🔹 *Arabcha:*  
  _اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ، فَاغْفِرْلِي يَا غَفَّارُ مَا قَدَّمْتُ وَمَا أَخَّرْتُ_  

🔹 *O‘zbekcha:*  
  *Allohumma laka sumtu va bika amantu va a’layka tavakkaltu va a’la rizqika aftartu, fag‘firli ya g‘offaru ma qoddamtu va ma axxortu.*  

🔹 *Ma’nosi:*  
  *Ey Alloh, ushbu Ro‘zamni Sen uchun tutdim va Senga iymon keltirdim va Senga tavakkal qildim va bergan rizqing bilan iftor qildim.  
  Ey mehribonlarning eng mehriboni, mening avvalgi va keyingi gunohlarimni mag‘firat qilgil!*
        `.trim();

        bot.sendMessage(user.userId, message, { parse_mode: "Markdown" });
    });
}

module.exports = { scheduleSaharlikReminder, scheduleIftorReminder };
