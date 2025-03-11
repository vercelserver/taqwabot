const { schedulePrayerReminders } = require("./src/services/prey-time-remainder.service");
const userCommands = require('./src/commands/user.command');

// run database 
require('./src/database/db');
require('./src/commands/bot.command')

// telegram bot commands
userCommands();
schedulePrayerReminders();