const User = require('../models/user');

async function addUser(userData) {
    const existingUser = await User.findOne({ userId: userData.id });

    if (existingUser) {
        return existingUser;
    }

    const newUser = new User({
        userId: userData.id,
        firstName: userData.first_name,
        username: userData.username,
        lastName: userData.last_name,
        points: 0,
        region: null,
        reminderBefore: 30, // Default 30 daqiqa oldin eslatma
    });

    await newUser.save();
    return newUser;
}

async function getUser(userId) {
    return await User.findOne({ userId });
}

async function updateUserSettings(userId, updates) {
    return await User.updateOne({ userId }, updates);
}

module.exports = { addUser, getUser, updateUserSettings };
