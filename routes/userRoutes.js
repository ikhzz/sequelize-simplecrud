const router = require("express").Router(); // Import express

const UserController = require("../controllers/UserController.js"); // Import TransaksiController
const AuthValidator = require('../middlewares/validators/AuthValidatorr.js')
const PassportMiddleware = require("../middlewares/auth"); // Import validator to validate every request from user

router.put('/edit', PassportMiddleware.userCheck, AuthValidator.updateUser, UserController.updateUser)
router.delete('/delete', PassportMiddleware.adminCheck)

module.exports = router; // Export router