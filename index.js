import express from 'express'
import connectDB from './src/database/index.js'
import bodyParser from 'body-parser'
import { configEnv } from './src/config/envConfig.js';
import authRouter from './src/routes/AuthContact.js'
import bookingRoute from './src/routes/BookingRoute.js';


const app = express()
app.use(bodyParser.json());

connectDB()

app.use(authRouter)
app.use(bookingRoute)


const port = configEnv.PORT

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})

