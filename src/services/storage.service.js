const AWS = require('aws-sdk');
const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToS3 = async (file, folder = 'uploads') => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (err) {
    logger.error({ message: 'S3 upload failed', error: err.message });
    throw err;
  }
};

const uploadToCloudinary = async (file, folder = 'uploads') => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            logger.error({ message: 'Cloudinary upload failed', error: error.message });
            return reject(error);
          }
          resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
  } catch (err) {
    logger.error({ message: 'Cloudinary upload logic failed', error: err.message });
    throw err;
  }
};

module.exports = {
  uploadToS3,
  uploadToCloudinary,
};
