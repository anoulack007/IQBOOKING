import { mongoose  } from "mongoose";

const bookingSchema = new mongoose.Schema({

    customerID: {type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
    roomID: {type: mongoose.Schema.Types.ObjectId, ref: 'room'},
    roomName: {type: String, required: true},
    meetingDate: String,
    meetingTime: String,
    startTime: String,
    endTime: String,
    equipment:{type: String, enum:["TV", "Microphone", "Board", "PlasmaDisplay", "Wifi", "Capacity15"]},
    status_booking_done:{type: Boolean, default: true}
},
{timestamps:true});

export const bookings = mongoose.model('bookings', bookingSchema);