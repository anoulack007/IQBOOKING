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
    { _id: UserContact._id, contact: UserContact.contact },
    configEnv.ACCESS_TOKEN_SECRET,
    { expiresIn: "8h" }
  );

  const refresh_token = jwt.sign(
    { _id: UserContact._id, contact: UserContact.contact },
    configEnv.REFRESH_TOKEN_SECRET,
    { expiresIn: "16h" }
  );

  res.json({
    access_token,
    refresh_token,
  });
};

const refreshToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);
    const token = req.headers["authorization"].split("Bearer ")[1];

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const findUser = await customerSchema.findById({ _id: decode._id });
    console.log(findUser);

    if (!findUser) {
      return res.send("user not found");
    }

    const accessToken = jwt.sign(
      { id: findUser._id, contact: findUser.contact },
      configEnv.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { _id: findUser._id, contact: findUser.contact },
      configEnv.REFRESH_TOKEN_SECRET,
      { expiresIn: "2d" }
    );


    return res.json({ accessToken, refreshToken });

  } catch (error) {

    return res.sendStatus(403);
    
  }
};

export const authContact = {
  RegisterContact,
  LoginContact,
  refreshToken,
};
