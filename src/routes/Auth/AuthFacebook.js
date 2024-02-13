import express from "express"
import { AuthFacebook } from "../../controller/auth/AuthFacebook.js"
import { Validation } from "../../validation/jwtValidate.js"

const authFacebook =express.Router()

authFacebook.post("/api/facebook/register", AuthFacebook.RegisterFacebook);

authFacebook.post("/api/facebook/login", AuthFacebook.LoginFacebook);

authFacebook.get("/api/facebook/read",Validation.jwtValidate,AuthFacebook.ReadManyFacebook);

authFacebook.get("/api/facebook/read/:id",Validation.jwtValidate,AuthFacebook.ReadFacebook);

authFacebook.put("/api/facebook/update/:id",Validation.jwtValidate,AuthFacebook.UpdateFacebook);

authFacebook.delete("/api/facebook/delete/:id",Validation.jwtValidate,AuthFacebook.DeleteGoogle);

export default authFacebook

