const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import controller
const PemasokController = require("../controllers/pemasokController.js");
const PassportMiddleware = require("../middlewares/auth");
const PemasokValidator = require("../middlewares/validators/pemasokValidator.js");

router.get("/", PassportMiddleware.userCheck, PemasokController.getAll); // If GET (/transaksi), will go to getAll function in transaksiController class
router.get("/:id", PassportMiddleware.adminCheck, PemasokValidator.getOneValidate, PemasokController.getOne);
router.post("/", PassportMiddleware.adminCheck, PemasokValidator.createvalidate, PemasokController.createPemasok);
router.put("/:id", PassportMiddleware.adminCheck, PemasokValidator.updateValidate, PemasokController.updatePemasok);
router.delete("/:id", PassportMiddleware.adminCheck, PemasokValidator.getOneValidate, PemasokController.deletePemasok);

module.exports = router;
