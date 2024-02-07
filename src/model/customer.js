import mongoose from 'mongoose'
const CustomerModel = new mongoose.Schema({
    profileId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Profile'
    },
    contact:{
        type:String
    },
    password:{
        type:String
    },
    google:{
        type:String
    },
    facebook:{
        type:String
    }
},{timestamps:true})

export const customerSchema = mongoose.model('customer',CustomerModel)