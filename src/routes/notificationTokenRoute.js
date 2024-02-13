import express from 'express';
import { n } from '../controller/booking/notificationTokenController.js';
const notificationTokenRoute = express.Router()

//Notification Token Route
notificationTokenRoute.post("/api/create/notificationToken/", n.createNotificationToken);

export default notificationTokenRoute;