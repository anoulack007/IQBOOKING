import { mongoose } from "mongoose";

const notificationTokenSchema = new mongoose.Schema({
    customerID: {type: String, required: true},
    token: {type: String, required: true}
});

export const notification = mongoose.model('notification', notificationTokenSchema)