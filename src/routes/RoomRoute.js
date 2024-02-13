import express from 'express';
import { r } from '../controller/booking/roomController.js';
const roomRoute = express.Router()

//Room Route
roomRoute.get("/api/room", r.viewRoom);
roomRoute.get("/api/room/:id", r.viewRoomID);
roomRoute.post("/api/create/room", r.createRoom);
roomRoute.put("/api/update/room/:id", r.updateRoomID);
roomRoute.delete("/api/delete/room/:id", r.deleteRoomID);

export default roomRoute;