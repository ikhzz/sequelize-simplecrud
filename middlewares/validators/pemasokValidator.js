const { pemasok } = require("../../models"); // Import all models
const validator = require("validator");

// validator class for request to pemasok table
class PemasokValidator {
  // validator for single item request
  getOneValidate = async (req, res, next) => {
    try {
      const errors = [];
      // validator if the request id is not a number
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          message: "Request not valid",
        });
      }
      // get the requested data
      const getData = await pemasok.findOne({
        where: { id: req.params.id },
      });
      // validator if the requested data doesn't exit
      if (getData == null) {
        return res.status(400).json({
          message: "Pemasok not Found",
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
  }
  // validator for create item request
  createvalidate = async (req, res, next) => {
    try {
      // validator if the request name is not an alphabet
      if (!validator.isAlpha(req.body.nama, ['en-US'], {ignore: ' '})) {
        return res.status(400).json({
          message: "Nama pemasok not valid",
        });
      }
      const findData = await pemasok.findOne({
        where: req.body
      })
      if (findData) {
        return res.status(400).json({
          message: "Nama pemasok is already exist",
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
  }
  // validator for update item request
  updateValidate = async (req, res, next) => {
    try {
      
      // validator if the request id is not a number
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          message: "Request not valid",
        });
      }
      // validator if the request name is not an alphabet
      if (!validator.isAlpha(req.body.nama)) {
        errors.push("Nama pemasok not valid");
      }
      // get the requested data to update
      const findData = await Promise.all([
        pemasok.findOne({
          where: req.params,
        }),
        pemasok.findOne({
          where: req.body
        })
      ])
      const errors = [];
      // validator if the requested data doesn't exit
      if (!findData[0]) {
        errors.push("Pemasok Not Found");
      }
      if (findData[1]) {
        errors.push("Nama pemasok is already exist");
      }
      // trigger if the request has error
      if (errors.length > 0) {
        // Because bad request
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      // continue to next controller
      next();
    } catch (error) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e,
      });
    }
  }
}

module.exports = new PemasokValidator();
