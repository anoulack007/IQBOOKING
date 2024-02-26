import express from 'express';
import connectDB from './src/database/index.js'
import bodyParser from 'body-parser';
import { configEnv } from './src/config/envConfig.js';
import authRouter from './src/routes/Auth/AuthContact.js'
import authGoogle from './src/routes/Auth/AuthGoogle.js';
import authFacebook from './src/routes/Auth/AuthFacebook.js';
import profileRouter from './src/routes/profile.js';
import authTernAndCondition from './src/routes/termAndCondition.js';
import authPolicy from './src/routes/policy.js';
import cors from 'cors';

import bookingRoute from './src/routes/BookingRoute.js';
import roomRoute from './src/routes/RoomRoute.js';
import favRoute from './src/routes/favoriteRoute.js';
import notificationTokenRoute from './src/routes/notificationTokenRoute.js';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors());


connectDB()

app.use(authRouter)
app.use(profileRouter)
app.use(authGoogle)
app.use(authFacebook)
app.use(authTernAndCondition)
app.use(authPolicy)
app.use(cors)


app.use(express.static('Picture'))
app.use(authRouter);
app.use(bookingRoute);
app.use(roomRoute);
app.use(favRoute);
app.use(notificationTokenRoute);


const port = configEnv.PORT

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});
