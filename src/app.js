const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(
	session({
		secret: "secret-key", // Set a secret key for session encryption
		resave: false,
		saveUninitialized: true,
	})
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

module.exports = app;
