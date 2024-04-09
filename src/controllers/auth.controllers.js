const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function handleError(error) {
	const errors = {};

	if (error.name === "ValidationError") {
		for (const key in error.errors) {
			errors[key] = error.errors[key].message;
		}
	}

	if (error.code === 11000) {
		errors["email"] = "email already registered!";
	}

	if (error.message === "email not registered") {
		errors["email"] = "email not registered";
	}

	if (error.message === "wrong password") {
		errors["password"] = "wrong password";
	}

	return errors;
}

function createJWToken(userId) {
	const userToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: parseInt(process.env.JWT_EXPIRY),
	});
	return userToken;
}

const handleGetRegister = (req, res) => {
	res.render("register");
};

const handlePostRegister = async (req, res) => {
	const { fullName, email, password, age } = req.body;

	try {
		const newUser = await User.create({
			fullName: fullName,
			email: email,
			password: password,
			age: age,
		});

		const userToken = createJWToken(newUser._id);

		res.cookie("jwt", userToken, {
			maxAge: parseInt(process.env.COOKIE_EXPIRY),
			httpOnly: true,
		});

		res.status(200).json({ userId: newUser._id });
	} catch (err) {
		const error = handleError(err);
		res.status(400).json({ error });
	}
};

const handleGetLogin = (req, res) => {
	res.render("login");
};

const handlePostLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error("email not registered");
		}

		const hashedPassword = user.password;
		const isPasswordCorrect = await bcrypt.compare(
			password,
			hashedPassword
		);

		if (!isPasswordCorrect) {
			throw new Error("wrong password");
		}

		const userToken = createJWToken(user._id);

		res.cookie("jwt", userToken, {
			maxAge: parseInt(process.env.COOKIE_EXPIRY),
			httpOnly: true,
		});

		const returnToPath = req.session.returnTo || "/";
		delete req.session.returnTo;
		res.status(200).json({ returnToPath });
	} catch (err) {
		const error = handleError(err);
		res.status(400).json({ error });
	}
};

const handleGetLogout = (req, res) => {
	res.cookie("jwt", "", {
		maxAge: 1,
		httpOnly: true,
	});
	res.redirect("/");
};

module.exports = {
	handleGetRegister,
	handlePostRegister,
	handleGetLogin,
	handlePostLogin,
	handleGetLogout,
};
