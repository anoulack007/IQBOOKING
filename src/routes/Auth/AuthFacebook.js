import express from "express"
import { AuthFacebook } from "../../controller/auth/AuthFacebook.js"
import { Validation } from "../../validation/jwtValidate.js"

const authFacebook =express.Router()

authFacebook.post("/facebook/register", AuthFacebook.RegisterFacebook);

authFacebook.post("/facebook/login", AuthFacebook.LoginFacebook);

authFacebook.get("/facebook/read",Validation.jwtValidate,AuthFacebook.ReadManyFacebook);

authFacebook.get("/facebook/read/:id",Validation.jwtValidate,AuthFacebook.ReadFacebook);

authFacebook.put("/facebook/update/:id",Validation.jwtValidate,AuthFacebook.UpdateFacebook);

authFacebook.delete("/facebook/delete/:id",Validation.jwtValidate,AuthFacebook.DeleteGoogle);

export default authFacebook

