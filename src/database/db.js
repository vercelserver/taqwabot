const mongoose = require("mongoose");
const { MONGODB_URL } = require("../../env");

const connectionString = `mongodb+srv://secret:secret@mysalah.wjoe5.mongodb.net/?retryWrites=true&w=majority&appName=MySalah`

const database = mongoose.createConnection(MONGODB_URL, {
	autoCreate: true,
	dbName: 'MY_SALAH_DB',
	bufferCommands: false, // Bufferingni o‘chirib qo‘yish
});

database.on('connected', () => {
	console.log(`⚡️[database]: MongoDB is running at ${connectionString}`);
});

database.on('error', (err) => {
	console.log(`❌[database]: Error connecting to MongoDB at ${connectionString}`);
	console.log(err);
});

database.on('disconnected', () => {
	console.log(`❌[database]: Disconnected from MongoDB at ${connectionString}`);
});

module.exports = database;
