import express from 'express'
import connectDB from './src/database/index.js'
import bodyParser from 'body-parser'
import { configEnv } from './src/config/envConfig.js';
import authRouter from './src/routes/Auth/AuthContact.js'
import authGoogle from './src/routes/Auth/AuthGoogle.js';
import authFacebook from './src/routes/Auth/AuthFacebook.js';
import profileRouter from './src/routes/profile.js';
import authTernAndCondition from './src/routes/termAndCondition.js';
import authPolicy from './src/routes/policy.js';


const app = express()
app.use(bodyParser.json());

connectDB()

app.use(authRouter)
app.use(profileRouter)
app.use(authGoogle)
app.use(authFacebook)
app.use(authTernAndCondition)
app.use(authPolicy)


app.use(express.static('Picture'))

const port = configEnv.PORT

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})

