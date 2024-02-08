import { mongoose } from "mongoose";

const favoriteSchema = new mongoose.Schema({
    roomID:{type: mongoose.Schema.Types.ObjectId, ref: 'rooms'},
    customerID: {type: mongoose.Schema.Types.ObjectId, ref: 'customers'}
},
{timestamps:true});

export const favorite = mongoose.model('favorite', favoriteSchema);