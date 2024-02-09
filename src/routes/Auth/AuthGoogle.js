import express from "express"
import { AuthGoogle } from "../../controller/auth/AuthGoogle.js"
import { Validation } from "../../validation/jwtValidate.js"

const authGoogle =express.Router()

authGoogle.post("/google/register", AuthGoogle.RegisterGoogle);

authGoogle.put("/google/changePassword/:id", AuthGoogle.ChangePasswordGoogle);

authGoogle.post("/google/refreshToken", AuthGoogle.refreshTokenGoogle);

authGoogle.post("/google/login", AuthGoogle.LoginGoogle);

authGoogle.get("/google/read",Validation.jwtValidate,AuthGoogle.ReadManyGoogle);

authGoogle.get("/google/read/:id",Validation.jwtValidate,AuthGoogle.ReadGoogle);

authGoogle.put("/google/update/:id",Validation.jwtValidate,AuthGoogle.UpdateGoogle);

authGoogle.delete("/google/delete/:id",Validation.jwtValidate,AuthGoogle.DeleteGoogle);

export default authGoogle

