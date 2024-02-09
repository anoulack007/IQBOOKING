import express from "express"
import { profile,UploadPic } from "../controller/profile.js";
import { Validation } from "../validation/jwtValidate.js";
const profileRouter = express.Router()

profileRouter.post("/profile/create",Validation.jwtValidate,UploadPic,profile.CreateProfile,)

profileRouter.get("/profile/read",Validation.jwtValidate,profile.ReadManyProfile)

profileRouter.get("/profile/read/:id",Validation.jwtValidate,profile.ReadProfile)

profileRouter.put("/profile/update/:id",Validation.jwtValidate,UploadPic,profile.UpdateProfile,)

profileRouter.delete("/profile/delete/:id",Validation.jwtValidate,profile.DeleteProfile)

export default profileRouter