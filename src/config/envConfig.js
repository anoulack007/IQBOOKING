import { config } from "dotenv"
config()

export const configEnv ={
    PORT:process.env.API_PORT,
    MONGOOSE:process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRE:process.env.ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE:process.env.REFRESH_TOKEN_EXPIRE,
}