import express from "express";
import { authContact } from "../../controller/auth/AuthContact.js";
import { Validation } from "../../validation/jwtValidate.js";
const authRouter = express.Router();

authRouter.post("/contact/register", authContact.RegisterContact);

authRouter.post("/contact/changePassword/:id",authContact.ChangePasswordContact);

authRouter.post("/contact/login", authContact.LoginContact);

authRouter.post("/contact/refreshToken", authContact.refreshToken);

authRouter.get("/contact/read",Validation.jwtValidate, authContact.ReadManyContact);

authRouter.get("/contact/read/:id",Validation.jwtValidate, authContact.ReadContact);

authRouter.put("/contact/update/:id",Validation.jwtValidate, authContact.UpdateContact);

authRouter.delete("/contact/delete/:id",Validation.jwtValidate, authContact.DeleteContact);

export default authRouter;
