const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import controller
const PelangganController = require("../controllers/pelangganController.js");
const PassportMiddleware = require("../middlewares/auth");
const PelangganValidator = require("../middlewares/validators/pelangganValidator");

router.get("/", PassportMiddleware.userCheck, PelangganController.getAll); // If GET (/transaksi), will go to getAll function in transaksiController class
router.get("/:id", PassportMiddleware.adminCheck, PelangganValidator.getOne, PelangganController.getOne);
router.post("/", PassportMiddleware.adminCheck, PelangganValidator.createPelanggan, PelangganController.createPelanggan);
router.put("/:id", PassportMiddleware.adminCheck, PelangganValidator.updatePelanggan, PelangganController.updatePelanggan);
router.delete("/:id", PassportMiddleware.adminCheck, PelangganValidator.getOne, PelangganController.deletePelanggan);

module.exports = router;