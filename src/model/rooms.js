import { mongoose } from "mongoose";

const roomsSchema = new mongoose.Schema({

    imageGallery: [ String ],
    roomName: {type: String, required: true},
    is_active_status: {type: Boolean, default: true},
    floor: String,
    type_room: String,
    description: String,
    is_active_booked: {type: Boolean, default: false}
},
{timestamps:true});

export const room = mongoose.model('room', roomsSchema);

