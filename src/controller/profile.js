import { profileSchema } from "../model/profile.js";
import { v2 as cloudinary } from 'cloudinary';
import { existsSync, unlinkSync } from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const CreateProfile = async (req, res) => {
  const { name, gmail, gender, phone, country } = req.body;

  if (req.pictureSingle == undefined) {
    const findGmail = await profileSchema.findOne({ gmail });

    if (findGmail) {
      return res.status(409).send("Profile Email Already Exist.");
    }

    const DataProfile1 = await profileSchema.create({
      name,
      gmail,
      gender,
      phone,
      country,
    });

    return res.status(200).send(DataProfile1);
  } else if (req.pictureSingle != undefined) {

    const avatar = req.pictureSingle.url

    const findGmail = await profileSchema.findOne({ gmail });

    if (findGmail) {
      return res.status(409).send("Profile Email Already Exist.");
    }

    const DataProfile2 = await profileSchema.create({
      name,
      gmail,
      gender,
      phone,
      country,
      image: avatar,
    });

    return res.status(200).send(DataProfile2);
  }
};

const ReadManyProfile = async (req, res) => {
  const findMany = await profileSchema.find();
  return res.status(200).send(findMany);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const ReadProfile = async (req, res) => {
  const { profileId } = req.user

  if (!profileId) return res.status(404).send('Profile Not found');

  const profile = await profileSchema.findById({ _id: profileId });

  if (!profile) {
    return res.status(400).send("Fails Find Profile");
  }

  res.status(200).send(profile);
};
//NOTE - Update Profile
const UpdateProfile = async (req, res) => {
  const { profileId } = req.user;
  const { name, gmail, gender, phone, country } = req.body;

  // const avatar = req.pictureSingle?.url
  if (req.pictureSingle == undefined) {
    const UpProfile = await profileSchema.findByIdAndUpdate(
      { _id: profileId },
      { name, gmail, gender, phone, country },
      { new: true }
    );

    return res.status(200).send(UpProfile);
  } else if (req.pictureSingle != undefined) {

    const avatar = req.pictureSingle.url

    const searchPic = await profileSchema.findById({ _id: profileId });

    if (existsSync("./src/Picture/" + searchPic.image)) {
      unlinkSync("./src/Picture/" + searchPic.image, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Update Success");
        }
      });
    }

    const UpProfile = await profileSchema.findByIdAndUpdate(
      { _id: profileId },
      { name, gmail, gender, phone, country, image: avatar },
      { new: true }
    );

    return res.status(200).send(UpProfile);
  }
};

const DeleteProfile = async (req, res) => {
  const { profileId } = req.user


  const deletePro = await profileSchema.findByIdAndDelete({ _id: profileId });

  if (existsSync("./src/Picture/" + deletePro.image)) {
    unlinkSync("./src/Picture/" + deletePro.image, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Delete Success");
      }
    });
  }

  if (!deletePro) {
    return res.status(400).send("Delete Profile Fails");
  } else {
    return res.status(200).send("Delete Profile Success");
  }
};

const viewPic = async (req, res) => {
  try {
    // Retrieve the image URL from Cloudinary based on the image ID
    const imageUrl = cloudinary.url(req.params.imageId);
    console.log(imageUrl);

    // Send the image URL in the response
    res.status(200).json({ imageUrl: imageUrl });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Internal server error' });
  }
}

const ViewPicture = async (req, res) => {
  const pic = req.params.file
  console.log(pic)
  // res.sendFile(join(__dirname,"../Picture/", pic))
  res.sendFile(join(__dirname, pic))

}

export const profile = {
  CreateProfile,
  ReadManyProfile,
  ReadProfile,
  UpdateProfile,
  DeleteProfile,
  ViewPicture,
  viewPic
};

// export const UploadPic = multer({
//   storage: storage,
// });
