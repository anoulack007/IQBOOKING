import { customerSchema } from "../../model/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configEnv } from "../../config/envConfig.js";
import { jwtGen, jwtRefresh } from "../../middleware/jwt.js";

const RegisterGoogle = async (req, res) => {
  const { google, password } = req.body;

  const OldUserGoogle = await customerSchema.findOne({ google });

  if (OldUserGoogle) {
    return res.status(400).send("User Google Already Exist. Please Login");
  }

  const encryptPassword = await bcrypt.hash(password, 10);

  const UserGoogle = await customerSchema.create({
    google,
    password: encryptPassword,
  });

  return res.status(201).send(UserGoogle);
};

const LoginGoogle = async (req, res) => {
  const { google, password } = req.body;

  if (!google || !password)
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

  const compare1 = await bcrypt.compare(password, UserGoogle.password);

  if (!compare1) {
    return res.send({ message: "password is incorrect", statusCode: 400 });
  }

  const access_token = jwtGen.jwtGenerate(UserGoogle);
  const refresh_token = jwtGen.jwtRefreshToken(UserGoogle);

  res.json({
    access_token,
    refresh_token,
  });
};

const refreshTokenGoogle = async (req, res, next) => {
  if (!req.headers["authorization"]) return res.sendStatus(401);

  const token = req.headers["authorization"].split("Bearer ")[1];

  const decode = jwt.verify(token, configEnv.REFRESH_TOKEN_SECRET);

  const findUserGoogle = await customerSchema.findById({ _id: decode.id });

  if (!findUserGoogle) {
    return res.send("user google not found");
  }

  const access_token = jwtRefresh.jwtAccess(findUserGoogle);
  const refresh_token = jwtRefresh.jwtReload(findUserGoogle);

  return res.json({ access_token, refresh_token });
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

const ChangePasswordGoogle = async (req, res) => {
  const { id } = req.params;

  const { passwordOld, passwordNew } = req.body;
  if (!passwordOld || !passwordNew) {
    return res.sendStatus(400).send("Fail Change Password Google");
  }

  const UserGoogle = await customerSchema.findById({ _id: id });
  if (!UserGoogle) return res.sendStatus(401);

  const compareContact = await bcrypt.compare(passwordOld, UserGoogle.password);
  if (!compareContact) {
    return res.status(401).send("Fail Change Password Google");
  }

  const password = await bcrypt.hash(passwordNew, 10);

  await customerSchema.findByIdAndUpdate({ _id: id }, { password });

  res.status(201).send("Change Password Google Success");
};

export const AuthGoogle = {
    RegisterGoogle,
    LoginGoogle,
    refreshTokenGoogle,
    ReadManyGoogle,
    ReadGoogle,
    UpdateGoogle,
    DeleteGoogle,
    ChangePasswordGoogle
}