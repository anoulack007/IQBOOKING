import express from 'express';
import connectDB from './src/database/index.js'
import bodyParser from 'body-parser';
import { configEnv } from './src/config/envConfig.js';
import authRouter from './src/routes/AuthContact.js'
import bookingRoute from './src/routes/BookingRoute.js';
import roomRoute from './src/routes/RoomRoute.js';
import favRoute from './src/routes/favoriteRoute.js';
import notificationTokenRoute from './src/routes/notificationTokenRoute.js';


const app = express();
app.use(bodyParser.json());

connectDB()

app.use(authRouter);
app.use(bookingRoute);
app.use(roomRoute);
app.use(favRoute);
app.use(notificationTokenRoute);


const port = configEnv.PORT

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});
