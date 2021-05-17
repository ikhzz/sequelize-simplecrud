const router = require("express").Router(); // Import express

const ColController = require("../controllers/CollectionController.js"); // Import TransaksiController
// const AuthValidator = require("../middlewares/validators/AuthValidatorr");
// const PassportMiddleware = require("../middlewares/auth"); // Import validator to validate every request from user

router.get("/getall/:col", ColController.getAll);
router.get("/getzip/:col", ColController.downloadZip);
router.post("/create", ColController.create);
// router.post("/signin", AuthValidator.signin, PassportMiddleware.signin, AuthController.getToken);

module.exports = router; // Export router