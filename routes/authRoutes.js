const router = require("express").Router(); // Import express

const AuthController = require("../controllers/AuthControllerr.js"); // Import TransaksiController
const AuthValidator = require("../middlewares/validators/AuthValidatorr");
const PassportMiddleware = require("../middlewares/auth"); // Import validator to validate every request from user


router.post("/signup", AuthValidator.signup, PassportMiddleware.signup, AuthController.getToken);

router.post("/signin", AuthValidator.signin, PassportMiddleware.signin, AuthController.getToken);

module.exports = router; // Export router