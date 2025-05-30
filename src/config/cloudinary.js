// config/cloudinary.js
import dotenv from 'dotenv';
dotenv.config();

// นำเข้า cloudinary และอื่น ๆ ตามต้องการ
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
