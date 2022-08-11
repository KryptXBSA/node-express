import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let production = true

export const PORT = process.env.PORT! || 7002
export const SOCKET_PORT = process.env.PORT! || 7004
export const SOCKET_CLIENT_SERVER = production ? ["https://kurdmake.com", "https://test.kurdmake.com"] : ["http://localhost:7003"]
export const JWT_SECRET = "secret"
export const MONGO_CONNECTION_STRING = 'mongodb+srv://test:test@cluster0.wkig6v5.mongodb.net/?retryWrites=true&w=majority'
export const DB_NAME = "test"
export const USER_COLLECTION = "users"
export const POST_COLLECTION = "posts"
export const LEADERBOARD_COLLECTION = "leaderboard"

export const POINTS_PER_CAPTCHA = 30
export const POINTS_PER_POST = 7
export const POINTS_PER_LIKE = 2
export const POINTS_PER_COMMENT = 3