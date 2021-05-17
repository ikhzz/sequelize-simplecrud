const S3 = require('aws-sdk/clients/s3');
const sharp = require('sharp')
const s3Zip = require("s3-zip")
const crypto = require('crypto');
const path = require('path')

const s3 = new S3({
  region: process.env.AWS_S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
})

class S3Middleware {
  
  uploadCollection = async (files) => {

    const fileName = crypto.randomBytes(16).toString("hex");
    files.name = `${fileName}${path.parse(files.name).ext}`;

    const uploadOriginal = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: files.data,
      Key: `image/original/${files.name}`,
      ACL : 'public-read',
      ContentType: files.mimetype
    }
  
    const compress = await sharp(files.data).png({quality: 80}).toBuffer()
    const uploadCompress = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: compress,
      Key: `image/compress/${files.name}`,
      ACL : 'public-read',
      ContentType: files.mimetype
    }
  
    return [s3.upload(uploadOriginal).promise(), s3.upload(uploadCompress).promise()]
  }

  downloadCollection = async (arr, res) => {

    const downloadParams = {
      bucket: process.env.AWS_S3_BUCKET_NAME,
      s3
    }
    const tempName = crypto.randomBytes(16).toString("hex");
    const folderName = 'image/original/'
  
    try {
      res.set("content-type", "application/zip");
      res.set("Content-Disposition", `attachment; filename=${tempName}.zip`);

      return await s3Zip.archive(downloadParams, folderName, arr).pipe(res)
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      })
    }
  }

  uploadProfile = async (files, req) => {

    const fileName = crypto.randomBytes(16).toString("hex");
    files.name = `${fileName}${path.parse(files.name).ext}`;
    req.body.image = files.name

    const uploadProfile = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: files.data,
      Key: `image/profile/${files.name}`,
      ACL : 'public-read',
      ContentType: files.mimetype
    }

    return s3.upload(uploadProfile).promise()
  }

  deleteProfile = async (key) => {
    const imageDelete = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `image/profile/${key}`,
    }

    return s3.deleteObject(imageDelete).promise()
  }
}

module.exports = new S3Middleware();