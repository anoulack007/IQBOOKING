import jwt from "jsonwebtoken";
import { customerSchema } from "../model/customer.js";
import { configEnv } from "../config/envConfig.js";

const jwtValidate = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).send("Token Invalid");
    }
  
    const token = req.headers["authorization"].split("Bearer ")[1];

    const decode = jwt.verify(token, configEnv.ACCESS_TOKEN_SECRET,(error,user)=>{if(error){return error} return user});
    
    if(decode.id === undefined) return res.status(401).send("UnAuthorization")
    const UserContact = await customerSchema.findById({ _id: decode.id });

    if (!UserContact) {
      return res.status(401).send("Token Invalid");
    }

    next();
  } catch (error) {
    return res.status(403);
  }
};

export const Validation = {
  jwtValidate,
};
