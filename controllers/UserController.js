const { user } = require("../models"); // Import all models
const s3Middleware = require('../middlewares/s3')

class UserController {
  updateUser = async(req, res) => {
    try {
      if(req.files){
        const checkImage = await user.findOne({ where: { id: req.user.id }})
        const file = req.files.image
  
        if (!file.mimetype.startsWith("image")) {
          return res.status(400).json({ message: "File must be an image " });
        }
        if (file.size > 1000000) {
          return res.status(400).json({ message: "Image must be less than 1MB" });
        }
        if(checkImage.image != null){
          await s3Middleware.deleteProfile(checkImage.image)
        } 

        await s3Middleware.uploadProfile(file, req)
      }

      await user.update(req.body, {where: {id: req.user.id}})

      return res.status(200).json({
        message: `user data is updated`
      })
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  deleteUser = async(req, res) => {}
}

module.exports = new UserController();