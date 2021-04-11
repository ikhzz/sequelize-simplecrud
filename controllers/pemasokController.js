const { pemasok } = require("../models"); // Import all models

// controller class for request to pemasok table
class PemasokController {
  // controller method for all item pemasok request
  async getAll(req, res) {
    try {
      const data = await pemasok.findAll({
        // find all data of Pemasok table
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
        error: e.message,
      });
    }
  }
  // controller method for single item request
  async getOne(req, res){
    try{
      // get the requested item data
      const data = await pemasok.findOne({
        where: req.params,
        attributes: ["id", "nama", ["createdAt", "waktu"]],
      })
      // send the requested data
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch(e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e.message,
      });
    }
  }
  // controller method for create item request
  async createPemasok(req, res){
    try {
      // create the new item for pemasok table
      const insertData = await pemasok.create(req.body)
      // send the detail of created data
      return res.status(200).json({
        message: "Success",
        data: insertData,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e.message,
      });
    }
  }
  // controller method for update item request
  async updatePemasok(req, res){
    try {
      // sequelize update method doesn't return detail value of the updated data
      await pemasok.update(req.body ,{where: req.params})
      // get the updated item data for response
      const updated = await pemasok.findOne({
        where: req.params,
        attributes: ["id", "nama", ["createdAt", "waktu"]],
      })
      // send the updated data
      return res.status(200).json({
        message: "Success",
        data: updated,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e.message,
      });
    }
  }
  // controller method for delete item request
  async deletePemasok(req, res){
    try {
      const deleted = await pemasok.findOne({
        where: req.params,
        // find data of pelanggan table
        attributes: ["id", "nama", ["createdAt", "waktu"]], // just these attributes that showed
      });
      await pemasok.destroy({
        where: req.params
      })
      // send all data
      return res.status(200).json({
        message: "Success",
        deleted
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e.message,
      });
    }
  }
}

module.exports = new PemasokController();