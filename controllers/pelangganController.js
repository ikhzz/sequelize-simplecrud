const { pelanggan } = require("../models"); // Import all models

// controller class for request to pelanggan table
class PelangganController {
  // controller method for all item pelanggan request
  async getAll(req, res) {
    try {
      // find all data of pelanggan table
      const data = await pelanggan.findAll({
        // find all data of pelanggan table
        attributes: ["id", "nama", ["createdAt", "waktu"]], // just these attributes that showed
      });
      // send response of all data
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e,
      });
    }
  }
  // controller method for single item request
  async getOne(req, res) {
    try {
      // get the requested item data
      const data = await pelanggan.findOne({
        where: req.params,
        attributes: ["id", "nama", ["createdAt", "waktu"]],
      });
      // send the requested data
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e,
      });
    }
  }
  // controller method for create item request
  async createPelanggan(req, res) {
    try {
      // create the new item for pelanggan table
      const insertData = await pelanggan.create(req.body);
      // send the detail of created data
      return res.status(200).json({
        message: "Success",
        data: insertData,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  // controller method for update item request
  async updatePelanggan(req, res) {
    try {
      // sequelize update method doesn't return detail value of the updated data
      await pelanggan.update( req.body, { where: req.params } );
      // get the updated item data for response
      const updated = await pelanggan.findOne({
        where: req.params,
        attributes: ["id", "nama", ["createdAt", "waktu"]],
      });
      // send the updated data
      return res.status(200).json({
        message: "Success",
        data: updated,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e,
      });
    }
  }
  // controller method for delete item request
  async deletePelanggan(req, res) {
    try {
      const deleted = await pelanggan.findOne({
        where: req.params,
        // find data of pelanggan table
        attributes: ["id", "nama", ["createdAt", "waktu"]], // just these attributes that showed
      });
      await pelanggan.destroy({
        where: req.params,
      });
      // get all data as response detail
      
      // send all data
      return res.status(200).json({
        message: "Success",
        deleted,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e,
      });
    }
  }
}

module.exports = new PelangganController();
