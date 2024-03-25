require("dotenv").config();
const connectDB = require("./src/db/connection");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

connectDB()
	.then(() =>
		app.listen(PORT, () => console.log(`App listening on Port: ${3000}`))
	)
	.catch((error) =>
		console.log(`MongoDB connection failed\nError: ${error.message}`)
	);
