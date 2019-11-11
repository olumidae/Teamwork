import { config, uploader } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  next();
};

export { cloudinaryConfig, uploader };


// const cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: 'olumidae',
//   api_key: '997935189879945',
//   api_secret: 'Wrajobr-xjLpQsO1O9ZWhfM7B0A',
// });

// // uploading the image to cloudinary

// exports.uploads = (file) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(file, (result) => {
//       resolve({ url: result.url, id: result.public_id });
//     }, { resource_type: 'auto' });
//   });
// };
