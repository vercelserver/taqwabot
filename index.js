const { schedulePrayerReminders } = require("./src/services/prey-time-remainder.service");
const userCommands = require('./src/commands/user.command');
const express = require("express");
const { connectDB } = require("./src/database/db");

const app = express();

connectDB().then(async () => {
    await userCommands();
    await schedulePrayerReminders();
    require('./src/commands/bot.command')
    app.listen(3000, () => console.log("Server is running on port 3000"));
}).catch(err => console.error(err)).finally(() => {
    console.log("Server is running on port 3000");
});
