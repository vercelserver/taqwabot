const { schedulePrayerReminders } = require("./src/services/prey-time-remainder.service");
const userCommands = require('./src/commands/user.command');
const express = require("express");

const app = express();

require('./src/database/db');
require('./src/commands/bot.command')

// telegram bot commands
userCommands();
schedulePrayerReminders();

app.listen(3000, () => console.log("Server is running on port 3000"));