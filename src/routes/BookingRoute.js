import express from 'express'
import { bk } from '../controller/booking/bookingController.js'
import { Validation } from "../validation/jwtValidate.js"
const bookingRoute = express.Router()

//Booking Route
bookingRoute.get("/api/booking",Validation.jwtValidate, bk.viewBooking);
bookingRoute.get("/api/booking/:id",Validation.jwtValidate, bk.viewBookingID);
bookingRoute.post("/api/create/booking",Validation.jwtValidate, bk.createBooking);
bookingRoute.put("/api/update/booking/:id",Validation.jwtValidate, bk.updateBookingID);
bookingRoute.delete("/api/delete/booking/:id",Validation.jwtValidate, bk.deleteBookingID);

export default bookingRoute;