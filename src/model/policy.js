import mongoose from "mongoose";
const policyModel = new mongoose.Schema({
    context:{
        type:String
    }
},{timestamps:true})

export const policySchema = mongoose.model('Policy', policyModel)