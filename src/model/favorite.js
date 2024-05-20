import { mongoose } from "mongoose";

const favoriteSchema = new mongoose.Schema({
    roomID:{type: mongoose.Schema.Types.ObjectId, ref: 'room'},
    customerID: {type: mongoose.Schema.Types.ObjectId, ref: 'customer'}
},
{timestamps:true});

export const favorite = mongoose.model('favorite', favoriteSchema);