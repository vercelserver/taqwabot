const { schedulePrayerReminders } = require("./src/services/prey-time-remainder.service");
const userCommands = require('./src/commands/user.command');
const express = require("express");
const { connectDB } = require("./src/database/db");

const app = express();

connectDB().then(async () => {
    await schedulePrayerReminders();
}).catch(err => console.error(err)).finally(() => {
    console.log("Server is running on port 3000");
});

require('./src/commands/bot.command')
userCommands();

app.listen(3000, () => console.log("Server is running on port 3000"));