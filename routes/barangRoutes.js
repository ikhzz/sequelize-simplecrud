const express = require("express"); // Import express
const router = express.Router(); // Make a router

// const { imageUpload } = require("../middlewares/uploads/imageUpload.js");
const BarangValidator = require("../middlewares/validators/barangValidator");
// Import controller
const BarangController = require("../controllers/barangController.js");
const PassportMiddleware = require("../middlewares/auth");

router.get("/", PassportMiddleware.userCheck, BarangController.getAll); // If GET (/transaksi), will go to getAll function in transaksiController class
router.get("/:id", PassportMiddleware.adminCheck, BarangValidator.getOneValidate, BarangController.getOne);
router.post("/", PassportMiddleware.adminCheck, BarangValidator.createvalidate, BarangController.createBarang);
router.put("/:id", PassportMiddleware.adminCheck, BarangValidator.updatevalidate, BarangController.updateBarang);
router.delete("/:id", PassportMiddleware.adminCheck, BarangValidator.getOneValidate, BarangController.deleteBarang);

module.exports = router;