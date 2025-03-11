module.exports = {
    welcomeMessage: (firstName) => `
🕌 Assalomu alaykum, *${firstName}*!  
*TaqwaBot* ga xush kelibsiz! 📿  

🏆 Ushbu bot yordamida siz:  
✅ Namoz vaqtlarini eslatmalari olishingiz  
✅ Tasbeh bilan zikr qilishingiz  
✅ Kunlik duolarni o‘qishingiz mumkin.  

🔹 Ro‘yxatdan o‘tish uchun *"/register"* buyrug‘ini bosing.
`,

    alreadyRegistered: `
✅ Siz allaqachon ro‘yxatdan o‘tgansiz! 🎉  
📌 Profilni ko‘rish: *"/profile"*
`,

    registrationSuccess: (firstName, points) => `
✅ *Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!* 🎉  

📛 Ismingiz: *${firstName}*  
🏆 Ball: *${points || 0}*  

📌 Endi *"/profile"* buyrug‘ini bosib, profilingizni ko‘rishingiz mumkin.
`,

    profileText: (user) => `
👤 *Ism:* ${user.firstName || "Noma’lum"}  
📛 *Username:* ${user.username ? "@" + user.username : "Yo‘q"}  
🏆 *Ball:* ${user.points} 🎯  
📍 *Hudud:* ${user.region || 'Sozlanmagan, /setting orqali sozlang'}  
🕒 *Eslatish:* ${user.reminderBefore ? `Namoz vaqti kirishiga ${user.reminderBefore} daqiqa qolganda eslatadi.` : 'Sozlanmagan, /reminder orqali sozlang'}  
`,

    selectRegion: "🌍 Hududingizni tanlang:",
    invalidRegion: "❌ Noto‘g‘ri hudud tanlandi. Qayta urinib ko‘ring.",
    regionUpdated: (region) => `✅ Hududingiz yangilandi: *${region}*`,

    enterReminderTime: "⏰ Qancha vaqt oldin eslatma beray? (Masalan: *30* daqiqa). Agar eslatmani o‘chirmoqchi bo‘lsangiz *0* kiriting.",
    invalidReminder: "❌ Noto‘g‘ri qiymat. Iltimos, faqat raqam kiriting (masalan: *30*).",
    reminderUpdated: (time) => `✅ Eslatma vaqti yangilandi: *${time} daqiqa oldin*`,
    reminderDisabled: "✅ Eslatma o‘chirildi.",

    userNotFound: "❌ Foydalanuvchi topilmadi. Iltimos, /start ni bosing.",
    regionNotSet: "❌ Hudud tanlanmagan. Iltimos, /setting ni bosing.",

    hadithMessage: (hadith) => `
📜 <b>Hadis</b>  
📖 <b>Kitob:</b> ${hadith.book}  
📚 <b>Bo‘lim:</b> ${hadith.bookName}  
📝 <b>Bob:</b> ${hadith.chapterName}

❝${hadith.header || "Noma’lum"}❞  

🔹 <b>Hadis matni:</b>  
<blockquote>${hadith.hadith_english}</blockquote>

📌 <b>Manba:</b> ${hadith.refno}
    `
};
