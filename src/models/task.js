const mongoose = require('mongoose');
const {database} = require('../database/db');

const taskModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "completed"]
    },
}, {
    collection: "tasks",
    timestamps: true
});

module.exports = database.model('Task', taskModel); 