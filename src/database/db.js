const mongoose = require("mongoose");
const { MONGODB_URL } = require("../../env");

const connectionString = MONGODB_URL || "mongodb+srv://secret:secret@mysalah.wjoe5.mongodb.net/?retryWrites=true&w=majority&appName=MySalah";

const database = mongoose.createConnection(connectionString, {
  autoCreate: true,
  dbName: "MY_SALAH_DB",
  bufferCommands: false, // Bufferingni o‘chirib qo‘yish
});

// ✅ Ulaniwni kutish funksiyasi
const connectDB = async () => {
  try {
    await database.asPromise(); // Ulanish tugaguncha kutish
    console.log(`⚡️[database]: MongoDB is running at ${connectionString}`);
  } catch (err) {
    console.error(`❌[database]: MongoDB Connection Error`, err);
    process.exit(1);
  }
};

database.on("error", (err) => {
  console.error(`❌[database]: Error connecting to MongoDB at ${connectionString}`, err);
});

database.on("disconnected", () => {
  console.warn(`❌[database]: Disconnected from MongoDB at ${connectionString}`);
});

// Export qilish
module.exports = { database, connectDB };