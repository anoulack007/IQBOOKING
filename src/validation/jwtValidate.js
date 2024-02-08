import jwt from "jsonwebtoken";
import { customerSchema } from "../model/customer.js";
import { configEnv } from "../config/envConfig.js";

const jwtValidate = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401).send("Token Invalid");
    }
  
    const token = req.headers["authorization"].split("Bearer ")[1];

    const decode = jwt.verify(token, configEnv.ACCESS_TOKEN_SECRET);

    const UserContact = await customerSchema.findById({ _id: decode.id });

    if (!UserContact) {
      return res.sendStatus(401).send("Token Invalid");
    }

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const Validation = {
  jwtValidate,
};
