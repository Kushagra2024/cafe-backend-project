const mongoose = require("mongoose");

const DB_NAME = "cafe_project";

async function connectDB() {
	try {
		await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`);
		console.log("MongoDB connected successfully");
	} catch (error) {
		throw error;
	}
}

module.exports = connectDB;
