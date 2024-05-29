import express from "express";
import { profile } from "../controller/profile.js";
import { UploadPic } from "../middleware/multer.js";
import { Validation } from "../validation/jwtValidate.js";
import uploadMiddleware from "../middleware/multer.js";

const profileRouter = express.Router();

profileRouter.post("/api/profile/create",
    Validation.jwtValidate,
    UploadPic.single('image'),
    uploadMiddleware,
    profile.CreateProfile
);

profileRouter.get("/api/profile/reads", Validation.jwtValidate, profile.ReadManyProfile);

profileRouter.get("/api/profile/read", Validation.jwtValidate, profile.ReadProfile);

profileRouter.put("/api/profile/update",
    Validation.jwtValidate,
    UploadPic.single('image'),
    uploadMiddleware,
    profile.UpdateProfile
);

profileRouter.delete("/api/profile/delete/", Validation.jwtValidate, profile.DeleteProfile);

profileRouter.get("/api/profile/picture/:imageId", profile.viewPic);

export default profileRouter;
