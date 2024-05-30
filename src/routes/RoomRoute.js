import express from 'express';
import { r } from '../controller/booking/roomController.js';
import { Validation } from "../validation/jwtValidate.js";
import { profile } from '../controller/profile.js';
import { uploadMiddlewareArray, UploadPic } from '../middleware/multer.js';

const roomRoute = express.Router()

//Room Route
roomRoute.get("/api/room", Validation.jwtValidate, r.viewRoom);
roomRoute.get("/api/room/:id", Validation.jwtValidate, r.viewRoomID);
roomRoute.get("/api/room/picture/:file", profile.viewPic)
roomRoute.post("/api/create/room", Validation.jwtValidate, UploadPic.array('images'),uploadMiddlewareArray,r.createRoom);
roomRoute.put("/api/update/room/:id", Validation.jwtValidate, UploadPic.array('images'),uploadMiddlewareArray, r.updateRoomID);
roomRoute.delete("/api/delete/room/:id", Validation.jwtValidate, r.deleteRoomID);
roomRoute.patch("/api/updatestatus/room/:id", Validation.jwtValidate, r.UpdateStatusRoom)


export default roomRoute;