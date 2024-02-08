import express from 'express'
import { bk } from '../controller/booking/bookingController.js'
const bookingRoute = express.Router()

//Booking Route
bookingRoute.get("/api/booking", bk.viewBooking);
bookingRoute.get("/api/booking/:id", bk.viewBookingID);
bookingRoute.post("/api/create/booking", bk.createBooking);
bookingRoute.put("/api/update/booking/:id", bk.updateBookingID);
bookingRoute.delete("/api/delete/booking/:id", bk.deleteBookingID);

export default bookingRoute;