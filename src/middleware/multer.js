import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder: 'profile_pictures',
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

export const UploadPic = multer({ storage });

const uploadMiddleware = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
      });
    }
  
    req.uploadedFile = result; // Save the upload result in request object
    next();
  });
};

export default uploadMiddleware;
