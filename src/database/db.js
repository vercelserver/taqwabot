const mongoose = require("mongoose");
const { MONGODB_URL } = require("../../env");

const connectionString = MONGODB_URL || "mongodb+srv://secret:secret@mysalah.wjoe5.mongodb.net/?retryWrites=true&w=majority&appName=MySalah";

// ✅ Ulanish funksiyasi
const connectDB = async () => {
	try {
	  await mongoose.connect(MONGODB_URL, {
		dbName: "MY_SALAH_DB",
		autoCreate: true,
		connectTimeoutMS: 60000, // Increase timeout (default is 30s)
		socketTimeoutMS: 60000, // Keep socket open longer
	  });
  
	  console.log(`⚡️[database]: MongoDB is running at ${MONGODB_URL}`);
	} catch (err) {
	  console.error(`❌[database]: MongoDB Connection Error`, err);
	  process.exit(1); // Xatolik bo‘lsa serverni to‘xtatish
	}
  };
  
  // ❌ `createConnection()` o‘rniga `mongoose.connect()` ishlatilmoqda
  module.exports = { connectDB, mongoose };