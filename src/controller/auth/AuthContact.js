import { customerSchema } from "../../model/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configEnv } from "../../config/envConfig.js";

const RegisterContact = async (req, res) => {
  const { contact, password } = req.body;

  const OldUserContact = await customerSchema.findOne({ contact });

  if (OldUserContact) {
    return res.status(400).send("User Already Exist. Please Login");
  }

  const encryptPassword = await bcrypt.hash(password, 10);

  const customer1 = await customerSchema.create({
    contact,
    password: encryptPassword,
  });

  return res.status(201).send(customer1);
};

const LoginContact = async (req, res) => {
  const { contact, password } = req.body;

  if (!contact || !password)
    return res.send({ message: "User or password not found", statusCode: 400 });

  const UserContact = await customerSchema.findOne({ contact });

  if (!UserContact) {
    return res.sendStatus(401);
  }

  const compare1 = await bcrypt.compare(password, UserContact.password);

  if (!compare1) {
    return res.send({ message: "password is incorrect", statusCode: 400 });
  }

  const access_token = jwt.sign(
    { id: UserContact._id},
    configEnv.ACCESS_TOKEN_SECRET,
    { expiresIn: "8h" }
  );

  const refresh_token = jwt.sign(
    { id: UserContact._id},
    configEnv.REFRESH_TOKEN_SECRET,
    { expiresIn: "16h" }
  );

  res.json({
    access_token,
    refresh_token,
  });
};

const refreshToken = async (req, res, next) => {

    if (!req.headers["authorization"]) return res.sendStatus(401);

    const token = req.headers["authorization"].split("Bearer ")[1];
 
    const decode = jwt.verify(token, configEnv.REFRESH_TOKEN_SECRET);

    const findUser = await customerSchema.findById({ _id: decode.id });

    if (!findUser) {
      return res.send("user not found");
    }

    const accessToken = jwt.sign(
      { id: findUser._id},
      configEnv.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: findUser._id},
      configEnv.REFRESH_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    return res.json({ accessToken, refreshToken });

};

const ReadManyContact = async (req, res) => {
  const contact = await customerSchema.find().populate("profileId");

  res.status(200).send(contact);
};

const ReadContact = async (req, res) => {
  const { id } = req.params;

  const contact = await customerSchema.findById(id).populate("profileId");

  res.status(200).send(contact);
};

const UpdateContact = async (req, res) => {
  const { id } = req.params;

  const { contact, profileId } = req.body;

  const ValidateUpdate = await customerSchema.findOne({ contact });
  if (ValidateUpdate) {
    return res.status(400).send("User Contact Already Exist. Please Login");
  }

  const UpdateContact = await customerSchema.findByIdAndUpdate(
    { _id: id },
    { contact, profileId: profileId },
    { new: true }
  );

  res.status(202).send(UpdateContact);
};

const DeleteContact = async (req, res) => {
  const { id } = req.params;

  const del = await customerSchema.findByIdAndDelete({ _id: id });

  res.status(200).send(del);
};

const ChangePasswordContact = async (req, res) => {
  const { id } = req.params;

  const { passwordOld, passwordNew } = req.body;
  if (!passwordOld || !passwordNew) {
    return res.sendStatus(400).send("Fail Change Password Contact");
  }

  const UserContact = await customerSchema.findById({ _id: id });
  if (!UserContact) return res.sendStatus(401);

  const compareContact = await bcrypt.compare(
    passwordOld,
    UserContact.password
  );
  if (!compareContact) {
    return res.status(401).send("Fail Change Password Contact");
  }

  const password = await bcrypt.hash(passwordNew, 10);
  await customerSchema.findByIdAndUpdate({ _id: id }, { password });
  res.status(201).send("Change Password Contact Success");
};

export const authContact = {
  RegisterContact,
  LoginContact,
  refreshToken,
  ReadManyContact,
  ReadContact,
  UpdateContact,
  DeleteContact,
  ChangePasswordContact,
};
