const { collection, image } = require("../models"); // Import all models
const s3Middleware = require("../middlewares/s3");

class CollectionController {
  getAll = async (req, res) => {
    try {
      const find = await image.findAll({ where: { col_id: req.params.col } });
      for (let i of find) {
        i.dataValues.imageUrl = `${process.env.AWS_OBJECT_URL}${i.dataValues.image}`
      }
      console.log(find);
      return res.status(200).json({
        message: "Success",
        data: find
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })  
    }
  };

  create = async (req, res) => {
    try {
      const create = await collection.create({
        title: req.body.title,
        desc: req.body.desc,
        item_id: req.body.item_id,
      });
      if (req.files) {        
        if (req.files.image.length > 1) {

          req.files.image.forEach(check => {
            if (!check.mimetype.startsWith("image")) {
              return res.status(400).json({ message: "File must be an image " });
            }
            if (check.size > 10000000) {
              return res.status(400).json({ message: "Image must be less than 1MB" });
            }    
          })

          for (let i in req.files.image) {
            const file = req.files.image[i];
            
            await Promise.all(s3Middleware.uploadCollection(file));

            await image.create({
              col_id: create.id,
              image: file.name,
            });
          }
        } else {
          const file = req.files.image;

          if (!file.mimetype.startsWith("image")) {
            return res.status(400).json({ message: "File must be an image " });
          }
          if (file.size > 10000000) {
            return res.status(400).json({ message: "Image must be less than 1MB" });
          }

          await Promise.all([s3Middleware.uploadCollection(file)]);

          await image.create({
            col_id: create.id,
            image: file.name,
          });
        }
      }

      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  downloadZip = async (req, res) => {
    try {
      const find = await image.findAll({ where: { col_id: req.params.col } });
      const imageName = [];
      for (let i of find) {
        imageName.push(i.image);
      }
      const result = await s3Middleware.downloadCollection(imageName, res);

      if (!result) {
        throw Error("Download Failed");
      }

      return result;
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
}

module.exports = new CollectionController();
