const mongoose = require('mongoose');

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

module.exports = mongoose.model('Task', taskModel); 