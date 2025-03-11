const express = require("express");
const { schedulePrayerReminders } = require("./src/services/prey-time-remainder.service");
const userCommands = require('./src/commands/user.command');
const { connectDB } = require("./src/database/db");

const app = express();
const port = 3000;

// Keep bot running
connectDB().then(async () => {
    await schedulePrayerReminders();
    console.log("✅ Bot is running and reminders are scheduled!");
}).catch(err => console.error("❌ Database connection error:", err));

// Keep Vercel alive
app.get('/api/keep-alive', (req, res) => {
    res.send("✅ Bot is running!");
});

// Start the Express server
app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));

require('./src/commands/bot.command');
userCommands();
