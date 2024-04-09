const jsonwebtoken = require("jsonwebtoken");

function isAuthorized(req, res, next) {
	const token = req.cookies.jwt;

	if (!token) {
		req.session.returnTo = req.originalUrl;
		return res.redirect("/user/login");
	}
	jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err) {
			return res.redirect("/user/login");
		}
		next();
	});
}

module.exports = {
	isAuthorized,
};
