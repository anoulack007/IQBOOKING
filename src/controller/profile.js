import { profileSchema } from "../model/profile.js";

const CreateProfile = async (req, res) => {
  const { name, gmail, gender, phone, country } = req.body;

  const findGmail = await profileSchema.findOne({ gmail });

  if (findGmail) {
    return res.status(409).send("Profile Email Already Exist.");
  }

  const DataProfile = await profileSchema.create({
    name,
    gmail,
    gender,
    phone,
    country,
  });

  return res.status(200).send(DataProfile);
};

const ReadManyProfile = async (req, res) => {
  const findMany = await profileSchema.find();
  return res.status(200).send(findMany);
};

const ReadProfile = async (req, res) => {
  const { id } = req.params;

  const profileId = await profileSchema.findById({ _id: id });
  if (!profileId) {
    return res.status(400).send("Fails Find Profile");
  }

  res.status(200).send(profileId);
};

const UpdateProfile = async (req, res) => {
  const { id } = req.params;

  const { name, gmail, gender, phone, country } = req.body;

  const findName = await profileSchema.findOne({ name });

  if (findName) {
    return res.status(400).send("Name Profile Already Exist");
  }

  const UpProfile = await profileSchema.findByIdAndUpdate(
    { _id: id },
    { name, gmail, gender, phone, country },
    { new: true }
  );

  res.status(200).send(UpProfile);
};

const DeleteProfile = async (req, res) => {
  const { id } = req.params;

  const deletePro = await profileSchema.findByIdAndDelete({ _id: id });

  if (!deletePro) {
    res.status(400).send("Delete Profile not found");
  } else {
    res.status(200).send("Delete Profile Success");
  }
};

export const profile = {
  CreateProfile,
  ReadManyProfile,
  ReadProfile,
  UpdateProfile,
  DeleteProfile,
};
