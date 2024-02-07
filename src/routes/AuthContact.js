import express from 'express'
import { authContact } from '../controller/auth/AuthContact.js'
const authRouter = express.Router()


authRouter.post("/auth/register",authContact.RegisterContact)
authRouter.post("/auth/login",authContact.LoginContact)
authRouter.post("/auth/refreshToken",authContact.refreshToken)

export default authRouter;