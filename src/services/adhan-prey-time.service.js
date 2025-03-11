const { PrayerTimes, Coordinates, CalculationMethod, Madhab } = require('adhan');

const getPrayerTimes = async (latitude, longitude, date = new Date()) => {
    const coordinates = new Coordinates(latitude, longitude);
    const params = CalculationMethod.Other();
    params.madhab = Madhab.Hanafi;

    // O‘zbekiston Musulmonlar idorasi burchaklari
    // params.fajrAngle = 16;
    // params.ishaAngle = 17;

    // Vaqtlarni O‘zbekiston Musulmonlar idorasi jadvaliga moslashtirish
    params.adjustments = {
        fajr:  1,  // Fajr 4 daqiqa qo‘shildi
        sunrise: -1, // Quyosh chiqishi 2 daqiqa qo‘shildi
        dhuhr:  -1,  // Peshin 2 daqiqa qo‘shildi
        asr: -1,     // Asr 2 daqiqa qo‘shildi
        maghrib: 4, // Shom 3 daqiqa qo‘shildi
        isha: -13   // Xufton 10 daqiqa oldin
    };

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    // UTC vaqtlarni GMT+5 ga o'tkazish
    const adjustTimezone = (time) => {
        if (!time) return null;
        const utcDate = new Date(time.toISOString());
        const gmt5Date = new Date(utcDate.getTime() + (5 * 60 * 60 * 1000));
        return gmt5Date.toISOString().split('T')[1].slice(0, 5); // HH:MM formatida chiqarish
    };

    return {
        date: date.toISOString().split('T')[0], // Sana YYYY-MM-DD formatida
        Fajr: adjustTimezone(prayerTimes.fajr),
        Sunrise: adjustTimezone(prayerTimes.sunrise),
        Dhuhr: adjustTimezone(prayerTimes.dhuhr),
        Asr: adjustTimezone(prayerTimes.asr),
        Maghrib: adjustTimezone(prayerTimes.maghrib),
        Isha: adjustTimezone(prayerTimes.isha),
    };
};

// **OYLIK NAMOZ VAQTLARINI OLISH FUNKSIYASI**
const getMonthlyPrayerTimes = async (latitude, longitude, year, month) => {
    const results = [];
    const daysInMonth = new Date(year, month, 0).getDate(); // Oydagi kunlar soni

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day); // JavaScript oylari 0 dan boshlanadi
        const dailyTimes = await getPrayerTimes(latitude, longitude, date);
        results.push(dailyTimes);
    }

    return results;
};

module.exports = { getPrayerTimes, getMonthlyPrayerTimes };
