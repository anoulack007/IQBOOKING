import express from 'express';
import { r } from '../controller/booking/roomController.js';
import { Validation } from "../validation/jwtValidate.js";
import { UploadPic } from '../controller/profile.js';
const roomRoute = express.Router()

//Room Route
roomRoute.get("/api/room",Validation.jwtValidate,r.viewRoom);
roomRoute.get("/api/room/:id",Validation.jwtValidate, r.viewRoomID);
roomRoute.post("/api/create/room",Validation.jwtValidate,UploadPic.array('images'), r.createRoom);
roomRoute.put("/api/update/room/:id",Validation.jwtValidate,UploadPic.array('images'), r.updateRoomID);
roomRoute.delete("/api/delete/room/:id",Validation.jwtValidate, r.deleteRoomID);

export default roomRoute;