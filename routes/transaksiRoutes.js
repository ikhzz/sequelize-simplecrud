const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import controller
const TransaksiController = require("../controllers/transaksiController");
const TransaksiValidator = require("../middlewares/validators/transaksiValidator.js");
const PassportMiddleware = require("../middlewares/auth");

router.get("/", PassportMiddleware.userCheck, TransaksiController.getAll); // If GET (/transaksi), will go to getAll function in transaksiController class
router.get("/:id", PassportMiddleware.adminCheck, TransaksiValidator.getOneValidate, TransaksiController.getOne);
router.post("/", PassportMiddleware.adminCheck, TransaksiValidator.createValidate, TransaksiController.createTransaksi);
router.put("/:id", PassportMiddleware.adminCheck, TransaksiValidator.updateValidate, TransaksiController.updateTransaksi);
router.delete("/:id", PassportMiddleware.adminCheck, TransaksiValidator.getOneValidate, TransaksiController.deleteTransaksi);

module.exports = router; // Export router
