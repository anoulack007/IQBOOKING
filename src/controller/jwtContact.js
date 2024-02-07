import jwt from 'jsonwebtoken'
import {customerSchema} from '../model/customer.js'

export const jwtGenerate = (contact) =>{
    const accessToken = jwt.sign(
        {contact:contact.contact, id:contact._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1d"}
    )
    return accessToken
}
export const jwtRefreshTokenGenerate = (contact)=>{
    const refreshToken = jwt.sign(
        {contact:contact.contact,id:contact._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"2d"}
    )
    return refreshToken
}