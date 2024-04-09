const mongoose = require("mongoose");

const DB_URI =
	process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/cafe_project";

async function connectDB() {
	try {
		await mongoose.connect(`${DB_URI}`);
		console.log("MongoDB connected successfully");
	} catch (error) {
		throw new Error(`MongoDB connection failed.\n${error.message}`);
	}
}

module.exports = connectDB;
