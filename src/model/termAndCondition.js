import mongoose from 'mongoose'
const termAndConditionSchema = new mongoose.Schema({
    context:{
        type:String
    }
},{timestamps:true})

export const ConditionModel = mongoose.model('TermAndCondition',termAndConditionSchema)