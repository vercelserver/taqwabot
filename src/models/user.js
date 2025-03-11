const mongoose = require('mongoose');
const database = require('../database/db');

const user = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: String,
    firstName: String,
    lastName: String,
    points: { type: Number, default: 0 }, // Reyting uchun ball,
    reminderBefore: { type: Number, default: 30 }, // Eslatma vaqti (daqiqa),
    region: {
        type: String,
    },
}, {
    collection: "users",
    timestamps: true
});

module.exports = database.model('user', user); 