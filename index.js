import express from 'express'
import connectDB from './src/database/index.js'
import bodyParser from 'body-parser'
import { configEnv } from './src/config/envConfig.js';
import authRouter from './src/routes/Auth/AuthContact.js'
import authGoogle from './src/routes/Auth/AuthGoogle.js';
import profileRouter from './src/routes/profile.js';

const app = express()
app.use(bodyParser.json());

connectDB()

app.use(authRouter)
app.use(profileRouter)
app.use(authGoogle)

const port = configEnv.PORT

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})

