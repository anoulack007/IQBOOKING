import mongoose from'mongoose'
import { configEnv } from '../config/envConfig.js';


const connectDB = ()=>{
    mongoose.connect(configEnv.MONGOOSE,{})
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log(err));
}
export default connectDB