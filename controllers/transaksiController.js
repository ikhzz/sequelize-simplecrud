const { transaksi, barang, pelanggan, pemasok } = require("../models"); // Import all models

// controller class for request to transaksi table
class TransaksiController {
  // Get all transaksi data
  async getAll(req, res) {
    try {
      let data = await transaksi.findAll({
        // find all data of Transaksi table
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]], // just these attributes that showed
        include: [
          // Include is join
          {
            model: barang,
            attributes: ["nama"], // just this attribute from Barang that showed
            include: [
              // Include is join
              { model: pemasok, attributes: ["nama"] },
            ],
          },
          {
            model: pelanggan,
            attributes: ["nama"], // just this attribute from Pelanggan that showed
          },
        ],
      });

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
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
      const data = await transaksi.findOne({
        where: { id: req.params.id },
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]],
        include: [
          // Include is join
          {
            model: barang,
            attributes: ["nama"], // just this attribute from Barang that showed
            include: [
              // Include is join
              { model: pemasok, attributes: ["nama"] },
            ],
          },
          {
            model: pelanggan,
            attributes: ["nama"], // just this attribute from Pelanggan that showed
          },
        ],
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
  async createTransaksi(req, res) {
    try {
      // create the new item for transcation table, u can return the created data by access dataValues object
      const createdData = await transaksi.create(req.body);
      // get the created item detail with join
      const createdDataDetail = await transaksi.findOne({
        where: { id: createdData.id },
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]],
        include: [
          {
            model: barang,
            attributes: ["nama"],
            include: [{ model: pemasok, attributes: ["nama"] }],
          },
          {
            model: pelanggan,
            attributes: ["nama"],
          },
        ],
      });
      // send the detail of created data
      return res.status(200).json({
        message: "Success",
        data: createdDataDetail,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e,
      });
    }
  }
  // controller method for update item request
  async updateTransaksi(req, res) {
    try {
      // sequelize update method doesn't return detail value of the updated data
      await transaksi.update(req.body, { where: req.params });
      // get the updated item detail
      const updatedData = await transaksi.findOne({
        where: req.params,
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]],
        include: [
          // Include is join
          {
            model: barang,
            attributes: ["nama"], // just this attribute from Barang that showed
            include: [
              // Include is join
              { model: pemasok, attributes: ["nama"] },
            ],
          },
          {
            model: pelanggan,
            attributes: ["nama"], // just this attribute from Pelanggan that showed
          },
        ],
      });
      // send the detail of updated data
      return res.status(200).json({
        message: "Success",
        data: updatedData,
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
  async deleteTransaksi(req, res) {
    try {
      /* -you can either first get the item requested to delete or just send all data
      -sequelize destroy/delete method doesn't return detail value of the destroyed/deleted data */
      const data = await transaksi.findOne({
        where: req.params,
        attributes: ["id", "jumlah", "total", ["createdAt", "waktu"]],
        include: [
          // Include is join
          {
            model: barang,
            attributes: ["nama"], // just this attribute from Barang that showed
            include: [
              // Include is join
              { model: pemasok, attributes: ["nama"] },
            ],
          },
          {
            model: pelanggan,
            attributes: ["nama"], // just this attribute from Pelanggan that showed
          },
        ],
      });
      await transaksi.destroy({ where: req.params });
      // get all data as response detail
      // send all data
      return res.status(200).json({
        message: "Success",
        deleted_data: data,
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

module.exports = new TransaksiController();
