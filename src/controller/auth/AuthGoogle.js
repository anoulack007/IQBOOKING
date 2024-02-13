import { customerSchema } from "../../model/customer.js";
import { jwtGen } from "../../middleware/jwt.js";

const RegisterGoogle = async (req, res) => {
  const { google } = req.body;

  const OldUserGoogle = await customerSchema.findOne({ google });

  if (OldUserGoogle) {
    return res.status(400).send("User Google Already Exist. Please Login");
  }

  const UserGoogle = await customerSchema.create({
    google
  });

  return res.status(201).send(UserGoogle);
};

const LoginGoogle = async (req, res) => {
  const { google } = req.body;

  if (!google)
    return res.send({
      message: "User Google or password not found",
      statusCode: 400,
    });

  const UserGoogle = await customerSchema.findOne({ google });

  if (!UserGoogle) {
    return res.send({
      message: "User Google or password not found",
      statusCode: 400,
    });
  }


  const access_token = jwtGen.jwtGenerate(UserGoogle);
  const refresh_token = jwtGen.jwtRefreshToken(UserGoogle);

  res.json({
    access_token,
    refresh_token,
  });
};



const ReadManyGoogle = async (req, res) => {
  const google = await customerSchema.find().populate("profileId");

  res.status(200).send(google);
};

const ReadGoogle = async (req, res) => {
  const { id } = req.params;

  const google = await customerSchema.findById(id).populate("profileId");

  res.status(200).send(google);
};

const UpdateGoogle = async (req, res) => {
  const { id } = req.params;

  const { google, profileId } = req.body;

  const ValidateUpdate = await customerSchema.findOne({ google });
  if (ValidateUpdate) {
    return res.status(400).send("User Google Already Exist. Please Login");
  }

  const UpdateGoogle = await customerSchema.findByIdAndUpdate(
    { _id: id },
    { google, profileId: profileId },
    { new: true }
  );

  res.status(202).send(UpdateGoogle);
};

const DeleteGoogle = async (req, res) => {
  const { id } = req.params;

  const del = await customerSchema.findByIdAndDelete({ _id: id });

  res.status(200).send(del);
};


export const AuthGoogle = {
    RegisterGoogle,
    LoginGoogle,
    ReadManyGoogle,
    ReadGoogle,
    UpdateGoogle,
    DeleteGoogle
}