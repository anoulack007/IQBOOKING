import express from "express"
import { profile,UploadPic } from "../controller/profile.js";
import { Validation } from "../validation/jwtValidate.js";
const profileRouter = express.Router()

profileRouter.post("/api/profile/create",Validation.jwtValidate,UploadPic.single('images'),profile.CreateProfile,)

profileRouter.get("/api/profile/read",Validation.jwtValidate,profile.ReadManyProfile)

profileRouter.get("/api/profile/read/:id",Validation.jwtValidate,profile.ReadProfile)

profileRouter.put("/api/profile/update/:id",Validation.jwtValidate,UploadPic.single('images'),profile.UpdateProfile,)

profileRouter.delete("/api/profile/delete/:id",Validation.jwtValidate,profile.DeleteProfile)

profileRouter.get("/api/profile/picture/:file",profile.ViewPicture,)

export default profileRouter