const { barang, pemasok } = require("../../models"); // Import all models
const validator = require("validator");

// validator class for request to barang table
class BarangValidator {
  // validator method for single item request
  getOneValidate = async (req, res, next) => {
    try {
      // validator if the request id is not a number
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Id request not valid",
        });
      }
      // get the requested data
      const findData = await barang.findOne({ where: req.params });
      // validator if the requested data doesn't exit
      if (findData == null) {
        return res.status(404).json({
          error: "Bad Request",
          message: "Barang Not Found",
        });
      }
      // continue to next controller
      next();
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e,
      });
    }
  };
  // validator method for update item request
  updatevalidate = async (req, res, next) => {
    try {
      // check if parameter, harga and id_pemasok not numerical and nama barang is not alphabet
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Id request not valid",
        });
      }
      if (!validator.isAlpha(req.body.nama, ["en-US"], this._ignore)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "nama_barang not valid",
        });
      }
      if (!validator.isNumeric(req.body.harga)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "harga_barang not valid",
        });
      }
      if (!validator.isNumeric(req.body.id_pemasok)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Id pemasok not valid",
        });
      }
      // get the requested data
      const findData = await Promise.all([
        barang.findOne({
          where: { id: req.params.id },
        }),
        pemasok.findOne({
          where: { id: req.body.id_pemasok },
        }),
        barang.findOne({
          where: { nama: req.body.nama },
        }),
      ]);

      // validator if the requested data doesn't exit or name is already exist
      const errors = [];

      if (!findData[0]) {
        errors.push("Barang Not Found");
      }
      if (!findData[1]) {
        errors.push("Pemasok is not exist");
      }
      if (findData[2]) {
        errors.push("Nama barang is already exist");
      }
      // trigger if the request has error
      if (errors.length > 0) {
        // Because bad request
        return res.status(400).json({
          message: errors.join(", "),
          getData,
        });
      }
      // continue to next controller
      next();
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e.message,
      });
    }
  };
  // validator method for create item request
  createvalidate = async (req, res, next) => {
    try {
      
      // check if harga and id_pemasok not numerical and nama barang is not alphabet
      if (!validator.isAlpha(req.body.nama, ["en-US"], {ignore: ' '})) {
        return res.status(400).json({
          error: "Bad Request",
          message: "nama_barang not valid",
        });
      }
      
      if (!validator.isNumeric(req.body.harga)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "harga_barang not valid",
        });
      }
      if (!validator.isNumeric(req.body.id_pemasok)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Id pemasok not valid",
        });
      }
      
      // Find Pemasok and nama barang
      const findData = await Promise.all([
        pemasok.findOne({
          where: { id: parseInt(req.body.id_pemasok) },
        }),
        barang.findOne({
          where: { nama: req.body.nama },
        }),
      ]);

      const errors = [];
      // Pemasok not found
      if (!findData[0]) {
        errors.push("Pemasok Not Found");
      }
      if (findData[1]) {
        errors.push("Nama barang is already exist");
      }
      // If errors length > 0, it will make errors message
      if (errors.length > 0) {
        // Because bad request
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      // It means that will be go to the next middleware
      next();
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e,
      });
    }
  };
}

module.exports = new BarangValidator();
