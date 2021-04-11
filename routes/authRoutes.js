const express = require("express"); // Import express
const router = express.Router(); // Make router from app
const passport = require("passport");
const AuthController = require("../controllers/authController.js"); // Import TransaksiController
const AuthValidator = require("../middlewares/validators/authValidator");
const PassportMiddleware = require("../middlewares/auth"); // Import validator to validate every request from user


router.post("/signup", AuthValidator.signup, PassportMiddleware.signup, AuthController.getToken);

router.post("/signin", AuthValidator.signin,PassportMiddleware.signin, AuthController.getToken);

module.exports = router; // Export router