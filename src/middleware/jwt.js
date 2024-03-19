import jwt from "jsonwebtoken";
import { configEnv } from "../config/envConfig.js";

const jwtGenerate = (contactUser) => {
  const access_token = jwt.sign(
    { id: contactUser._id },
    configEnv.ACCESS_TOKEN_SECRET,
    { expiresIn: "8h" }
  );
  return access_token;
};

const jwtRefreshToken = (contactUser) => {
  const refresh_token = jwt.sign(
    { id: contactUser._id },
    configEnv.REFRESH_TOKEN_SECRET,
    { expiresIn: "16h" }
  );
  return refresh_token;
};

const jwtAccess = (contactUser) => {
  const accessToken = jwt.sign(
    { id: contactUser._id },
    configEnv.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return accessToken;
};

const jwtReload = (contactUser) => {
  const refreshToken = jwt.sign(
    { id: contactUser._id },
    configEnv.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  return refreshToken;
};

export const jwtGen = {
  jwtGenerate,
  jwtRefreshToken,
};

export const jwtRefresh ={
    jwtAccess,
    jwtReload
}
