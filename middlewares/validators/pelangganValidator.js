const { pelanggan } = require("../../models"); // Import all models
const validator = require("validator");

// validator class for request to pelanggan table
class PelangganValidator{
  // validator method for single item request
  getOne = async (req, res, next) => {
    try {
      // validator if the request id is not a number
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          message: "Request not valid",
        });
      }
      // get the requested data
      const getData = await pelanggan.findOne({
        where: {id: req.params.id}
      })
      // validator if the requested data doesn't exit
      if(!getData){
        return res.status(400).json({
          message: "Request not found",
        });
      }
      // continue to next controller
      next()
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e,
      });
    }
  }
  // validator method for create item request
  async createPelanggan(req, res, next){
    try {
      // validator if the request name is not an alphabet
      if (!validator.isAlpha(req.body.nama, ['en-US'], {ignore: ' '})) {
        return res.status(400).json({
          message: "Nama pelanggan not valid",
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
      next()
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e,
      });
    }
  }
  // validator method for update item request
  async updatePelanggan(req, res, next){
    try {
      // validator if the request id is not a number
      if (!validator.isNumeric(req.params.id)) {
        return res.status(400).json({
          message: "Request not valid",
        });
      }
      // validator if the request name is not an alphabet
      if (!validator.isAlpha(req.body.nama)) {
        errors.push("Nama pelanggan not valid");
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
        errors.push("pelanggan Not Found");
      }
      if (findData[1]) {
        errors.push("Nama pelanggan is already exist");
      }
      // trigger if the request has error
      if (errors.length > 0) {
        // Because bad request
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      // continue to next controller
      next()
    } catch (error) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Validator",
        error: e,
      });
    }
  }
}

module.exports = new PelangganValidator()