export const SERVER_URL = 'http://localhost:7002'
export const IMAGE_URL = 'http://localhost:7002/images'

export const PORT = process.env.PORT! || 7002
export const JWT_SECRET = "secret"
export const MONGO_CONNECTION_STRING = 'mongodb+srv://test:test@cluster0.wkig6v5.mongodb.net/?retryWrites=true&w=majority'
export const DB_NAME = "test"
export const USER_COLLECTION = "users"
export const POST_COLLECTION = "posts"
export const LEADERBOARD_COLLECTION = "leaderboard"

export const POINTS_PER_CAPTCHA = 10
export const POINTS_PER_POST = 7
export const POINTS_PER_LIKE = 2
export const POINTS_PER_COMMENT = 3