const TASK_TYPES = {
    NAMOZ: "namoz",
    QURON: "quron",
    AXLOQIY: "axloqiy",
    SOGLIQ: "sogliq",
    RAMAZON: "ramazon",
    GAMIFICATION: "gamification",
    CHALLENGE: "challenge"
}

const TASKS = [
    // 🕌 Namoz va Ibadat
    { id: 1, title: "Bomdod namozini vaqtida o‘qish", type: TASK_TYPES.NAMOZ },
    { id: 2, title: "Peshin namozini vaqtida o‘qish", type: TASK_TYPES.NAMOZ },
    { id: 3, title: "Asr namozini vaqtida o‘qish", type: TASK_TYPES.NAMOZ  },
    { id: 4, title: "Shom namozini vaqtida o‘qish", type: TASK_TYPES.NAMOZ  },
    { id: 5, title: "Xufton namozini vaqtida o‘qish", type: TASK_TYPES.NAMOZ  },
    { id: 6, title: "Vitr namozini o‘qish", type: TASK_TYPES.NAMOZ  },
    { id: 7, title: "Tahajjud namozini o‘qish", type: TASK_TYPES.NAMOZ  },
    { id: 8, title: "Qazo namozini o‘qish", type: TASK_TYPES.NAMOZ  },
    { id: 10, title: "100 marta Astag‘firulloh aytish", type: TASK_TYPES.NAMOZ  },
    { id: 11, title: "100 marta Salavat aytish", type: TASK_TYPES.NAMOZ  },
    
    // 📖 Qur'on va Ilm
    { id: 12, title: "Kuniga kamida 1 sahifa Qur’on tilovati", type: TASK_TYPES.QURON },
    { id: 13, title: "Qur’on ma’nolarini o‘rganish (tafsir o‘qish)", type: TASK_TYPES.QURON },
    { id: 14, title: "Hadis o‘qish va uning ma’nosini tushunish", type: TASK_TYPES.QURON },
    { id: 15, title: "Islomiy kitobdan 1 bet o‘qish", type: TASK_TYPES.QURON },
    
    // 🤝 Axloqiy va Ruhiy
    { id: 16, title: "Kimdir bilan samimiy gaplashish va yaxshi muomala qilish", type: TASK_TYPES.AXLOQIY },
    { id: 17, title: "Biron yaxshi amal qilish (ehson, sadaqa, zakot)", type: TASK_TYPES.AXLOQIY },
    { id: 18, title: "G‘iybatdan saqlanish va boshqalarga yaxshi gapirish", type: TASK_TYPES.AXLOQIY },
    { id: 19, title: "Sabr qilish va ijobiy fikrlash", type: TASK_TYPES.AXLOQIY },
    
    // 🏃 Sog‘liq va Jismoniy Faoliyat
    { id: 20, title: "5-10 daqiqa jismoniy mashqlar qilish", type: TASK_TYPES.SOGLIQ },
    { id: 21, title: "Halol va foydali ovqat iste’mol qilish", type: TASK_TYPES.SOGLIQ },
    { id: 22, title: "Kamida 5000 qadam yurish", type: TASK_TYPES.SOGLIQ },
    { id: 23, title: "Kunlik suv ichish normasi (2 litr)ni bajarish", type: TASK_TYPES.SOGLIQ },
    
    // 🌙 Ramazon Maxsus Tasklari
    { id: 24, title: "Iftor oldidan duo qilish", type: TASK_TYPES.RAMAZON },
    { id: 25, title: "Kimdir uchun iftorlik tayyorlash yoki ulashish", type: TASK_TYPES.RAMAZON },
    { id: 26, title: "Tarovih namozini o‘qish", type: TASK_TYPES.RAMAZON },
    { id: 27, title: "Laylatul Qadrni kutish va ibodat qilish", type: TASK_TYPES.RAMAZON },
    { id: 28, title: "Kamida bir marta saharlikka turish", type: TASK_TYPES.RAMAZON },
    { id: 29, title: "Ramazonda sadaqa yoki xayriya qilish", type: TASK_TYPES.RAMAZON },
  
    // 🎯 Gamification va Challenge Tasklar
    { id: 30, title: "3 kun ketma-ket topshiriqlarni bajarish", type: TASK_TYPES.GAMIFICATION },
    { id: 31, title: "10 kun ketma-ket topshiriqlarni bajarish", type: TASK_TYPES.GAMIFICATION  },
    { id: 32, title: "30 kun davomida har kuni kamida 3 task bajarish", type: TASK_TYPES.GAMIFICATION  },
  ];
  