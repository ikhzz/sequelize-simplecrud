const { barang, pemasok } = require("../models"); // Import all models
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

// controller class for request to barang table
class BarangController {
  // controller method for all item barang request
  async getAll(req, res) {
    try {
      // find all data of barang table
      const data = await barang.findAll({
        attributes: ["id", "nama", "harga", "image", ["createdAt", "waktu"]], // just these attributes that showed
        include: [
          // Include is join
          {
            model: pemasok,
            attributes: ["nama"], // just this attribute from pemasok that showed
          },
        ],
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
      const data = await barang.findOne({
        where: req.params,
        attributes: ["id", "nama", "harga", "image", ["createdAt", "waktu"]],
        include: [
          // Include is join
          {
            model: pemasok,
            attributes: ["nama"], // just this attribute from Barang that showed
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
  createBarang = async (req, res) => {
    try {
      if (req.files) await this.setImage(req, res);
      // create the new item for barang table
      const createdData = await barang.create(req.body);
      // send the detail of created data
      return res.status(200).json({
        message: "Success",
        data: createdData,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e,
      });
    }
  };
  // controller method for update item request
  updateBarang = async (req, res) => {
    try {
      if (req.files) {
        await this.setImage(req, res);
        const imageName = await barang.findOne({ where: req.params });
        await this.delImage(imageName.image);
      }

      // sequelize update method doesn't return detail value of the updated data
      await barang.update(req.body, { where: req.params });
      // get the updated item data for response
      const updated = await barang.findOne({
        where: req.params,
        attributes: ["id", "nama", "harga", "image", ["createdAt", "waktu"]],
        include: [
          // Include is join
          {
            model: pemasok,
            attributes: ["nama"], // just this attribute from Barang that showed
          },
        ],
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
  };
  // controller method for delete item request
  deleteBarang = async (req, res) => {
    try {
      const deleted = await barang.findOne({
        where: req.params,
        // find all data of barang table
        attributes: ["id", "nama", "harga", "image", ["createdAt", "waktu"]], // just these attributes that showed
        include: [
          // Include is join
          {
            model: pemasok,
            attributes: ["nama"], // just this attribute from pemasok that showed
          },
        ],
      });
      await this.delImage(deleted.image);
      await barang.destroy({ where: req.params });
      // send all data
      return res.status(200).json({
        message: "Success",
        deleted,
      });
    } catch (e) {
      // catch if async code failed
      return res.status(500).json({
        message: "Internal Server Error At Controller",
        error: e.message,
      });
    }
  };
  setImage = async (req, res) => {
    const file = req.files.image;

    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({ message: "File must be an image " });
    }

    if (file.size > 1000000) {
      return res.status(400).json({ message: "Image must be less than 1MB" });
    }

    let fileName = crypto.randomBytes(16).toString("hex");

    file.name = `${fileName}${path.parse(file.name).ext}`;

    req.body.image = file.name;
    try {
      await file.mv(`./public/images/${file.name}`, (err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  delImage = (filePath) => {
    filePath = `./public${filePath}`;

    fs.unlink(filePath, (err) => {
      if (err && err.code == "ENOENT") {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });
  };
}

module.exports = new BarangController();
