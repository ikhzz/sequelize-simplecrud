const { transaksi, barang, pelanggan, pemasok } = require("../../models");
const validator = require("validator");
// class validator untuk table transaksi
class TransaksiValidator {
  // validator method untuk create request
  createValidate = async (req, res, next) => {
    try {
      // check if id barang, pelanggan and jumlah is numeric
      if (!validator.isNumeric(req.body.id_barang)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "id barang not valid",
        });
      }
      if (!validator.isNumeric(req.body.id_pelanggan)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "id pelanggan not valid",
        });
      }
      if (!validator.isNumeric(req.body.jumlah)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Jumlah is not a valid input",
        });
      }
      // Find barang and pelanggan
      const findData = await Promise.all([
        barang.findOne({
          where: { id: req.body.id_barang },
        }),
        pelanggan.findOne({
          where: { id: req.body.id_pelanggan },
        }),
      ]);
      // Create errors variable
      const errors = [];
      // If barang not found
      if (!findData[0]) {
        errors.push("Barang Not Found");
      }
      // If pelanggan not found
      if (!findData[1]) {
        errors.push("Pelanggan Not Found");
      }
      // If errors length > 0, it will make errors message
      if (errors.length > 0) {
        // Because bad request
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      // req.body.total add value
      req.body.total = eval(findData[0].harga * req.body.jumlah);
      // go to next route
      next();
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  };
  // validator method for update request
  updateValidate = async (req, res, next) => {
    try {
      // check if id barang, pelanggan, parameter and jumlah is numeric
      if (!validator.isNumeric(req.body.id_barang)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "id barang not valid",
        });
      }
      if (!validator.isNumeric(req.body.id_pelanggan)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "id pelanggan not valid",
        });
      }
      if (!validator.isNumeric(req.body.jumlah)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Jumlah is not a valid input",
        });
      }
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "parameter not valid",
        });
      }
      // Find barang, pelanggan, transaksi
      const findData = await Promise.all([
        barang.findOne({
          where: { id: req.body.id_barang },
        }),
        pelanggan.findOne({
          where: { id: req.body.id_pelanggan },
        }),
        transaksi.findOne({
          where: { id: req.params.id }, // because we will update transaksi
        }),
      ]);
      // Create errors variable
      const errors = [];
      // If barang not found
      if (!findData[0]) {
        errors.push("Barang Not Found");
      }
      // If pelanggan not found
      if (!findData[1]) {
        errors.push("Pelanggan Not Found");
      }
      // If transaksi not found
      if (!findData[2]) {
        errors.push("Transaksi Not Found");
      }
      // If errors length > 0, it will make errors message
      if (errors.length > 0) {
        // Because bad request
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      // req.body.total add value
      req.body.total = eval(findData[0].harga * req.body.jumlah);
      // go to next route
      next();
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  };
  // method to validate one item request
  getOneValidate = async (req, res, next) => {
    try {
      // check if id is not numerical
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "id request tidak valid",
        });
      }
      // get the data
      const findData = await transaksi.findOne({ where: req.params });
      // check if the data exist
      if (findData == null) {
        return res.status(404).json({
          error: "Bad Request",
          message: "Transaksi Not Found",
        });
      }
      // go to next route
      next();
    } catch (error) {
      // if async code failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
}

module.exports = new TransaksiValidator();
