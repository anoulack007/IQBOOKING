import { customerSchema } from "../../model/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtGenerate, jwtRefreshTokenGenerate } from "../jwtContact.js";

const RegisterContact = async (req, res) => {
  const { contact, password, google, facebook } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  const customer1 = await customerSchema.create({
    contact,
    password: encryptPassword,
    google,
    facebook,
  });
  return res.status(201).send(customer1);
};

const LoginContact = async (req, res) => {
  const { contact, password } = req.body;

  if(!contact || !password) return res.status(400).send('fail')

  const UserContact = await customerSchema.findOne({ contact });


  await bcrypt.compare(password, customerSchema.password);
  const access_token = jwtGenerate(contact);
  const refresh_token = jwtRefreshTokenGenerate(contact);
  res.json({
    access_token,
    refresh_token,
  });
};

export const authContact = {
  RegisterContact,
  LoginContact,
};
