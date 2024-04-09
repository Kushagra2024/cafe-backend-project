require("dotenv").config();
const connectDB = require("./src/db/connection");
const app = require("./src/app");

const homeRouter = require("./src/routes/home.routes");
const smoothiesRouter = require("./src/routes/smoothies.route");
const userRouter = require("./src/routes/user.routes");

const { isAuthorized } = require("./src/middlewares/isAuthorized.middlewares");
const { getUser } = require("./src/middlewares/getUser.middlewares");

const PORT = process.env.PORT || 3000;

connectDB()
	.then(() =>
		app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`))
	)
	.catch((error) => console.log(`Error: ${error.message}`));

app.use("*", getUser);
app.use("/user", userRouter);
app.use("/smoothies", isAuthorized, smoothiesRouter);
app.use("/", homeRouter);
