const User = require("../models/users.model");
const jsonwebtoken = require("jsonwebtoken");

function getUser(req, res, next) {
	const token = req.cookies.jwt;

	if (!token) {
		res.locals.user = null;
		next();
		return;
	}
	jsonwebtoken.verify(
		token,
		process.env.JWT_SECRET,
		async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
				return;
			}
			const user = await User.findById(decodedToken.userId);
			res.locals.user = user;
			next();
		}
	);
}

module.exports = {
	getUser,
};
