import express from "express"
import { AuthGoogle } from "../../controller/auth/AuthGoogle.js"
import { Validation } from "../../validation/jwtValidate.js"

const authGoogle =express.Router()

authGoogle.post("/api/google/register", AuthGoogle.RegisterGoogle);

authGoogle.post("/api/google/login", AuthGoogle.LoginGoogle);

authGoogle.get("/api/google/read",Validation.jwtValidate,AuthGoogle.ReadManyGoogle);

authGoogle.get("/api/google/read/:id",Validation.jwtValidate,AuthGoogle.ReadGoogle);

authGoogle.put("/api/google/update/:id",Validation.jwtValidate,AuthGoogle.UpdateGoogle);

authGoogle.delete("/api/google/delete/:id",Validation.jwtValidate,AuthGoogle.DeleteGoogle);

export default authGoogle

