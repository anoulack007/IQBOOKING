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
    public_id: (req, file) => file.originalname,
  },
});

export const UploadPic = multer({ storage });

const uploadMiddleware = async (req, res, next) => {
  let uploadedFiles = []

  if (!req.file && (!req.files || req.files.length === 0)) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }


  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    uploadedFiles.push(result);
    
  } else if (req.files) {
    for (const file of req.files) {
      // console.log(file);
      const result = await cloudinary.uploader.upload(file.path);
      console.log(result);
      uploadedFiles.push(result);
    }
  }

  req.uploadedFiles = uploadedFiles; // Save the upload results in the request object
  next();


};

export default uploadMiddleware;



