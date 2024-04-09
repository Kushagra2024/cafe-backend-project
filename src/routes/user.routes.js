const router = require("express").Router();
const {
	handleGetRegister,
	handlePostRegister,
	handleGetLogin,
	handlePostLogin,
	handleGetLogout,
} = require("../controllers/auth.controllers");

router.get("/register", handleGetRegister);

router.post("/register", handlePostRegister);

router.get("/login", handleGetLogin);

router.post("/login", handlePostLogin);

router.get("/logout", handleGetLogout);

module.exports = router;
