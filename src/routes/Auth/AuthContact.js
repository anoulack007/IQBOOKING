import express from "express";
import { authContact } from "../../controller/auth/AuthContact.js";
import { Validation } from "../../validation/jwtValidate.js";
const authRouter = express.Router();

authRouter.post("/api/contact/register", authContact.RegisterContact);

authRouter.post("/api/contact/changePassword/:id",authContact.ChangePasswordContact);

authRouter.post("/api/contact/login", authContact.LoginContact);

authRouter.post("/api/contact/refreshToken", authContact.refreshToken);

authRouter.get("/api/contact/read",Validation.jwtValidate, authContact.ReadManyContact);

authRouter.get("/api/contact/read/:id",Validation.jwtValidate, authContact.ReadContact);

authRouter.put("/api/contact/update/:id",Validation.jwtValidate, authContact.UpdateContact);

authRouter.delete("/api/contact/delete/:id",Validation.jwtValidate, authContact.DeleteContact);

export default authRouter;
