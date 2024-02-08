import mongoose from 'mongoose'
const ProfileModel = new mongoose.Schema({
    name:{
        type:String
    },
    gmail:{
        type:String,
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        default:'Other'
    },
    phone:{
        type:String
    },
    country:{
        type:String
    }
},{timestamps:true})

export const profileSchema = mongoose.model('Profile', ProfileModel)