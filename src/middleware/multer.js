import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { stringify } from "querystring";

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

export const uploadMiddlewareSingle = async (req, res, next) => {

  if (req.file != undefined) {

    const avatar = req.file?.path
    // console.log(avatar);    
    const result = await cloudinary.uploader.upload(avatar);

    req.pictureSingle = result; // Save the upload results in the request object
    next();
  } else {
    next();
  }

};


export const uploadMiddlewareArray = async (req, res,next) => {
  let pictureArray = []
  
  if (req.files.length !== 0) {
    // console.log(req.files);
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      pictureArray.push(result);
    }
    req.uploadedFiles = pictureArray;
    next();
    }else{
    next();
}
}
