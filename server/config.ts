let production = process.env.PRODUCTION;

export const PORT = 7002;
export const SOCKET_PORT = 7004;
export const SOCKET_CLIENT = production
  ? ["https://node-express.kurdmake.com"]
  : ["http://localhost:7003"];
export const JWT_SECRET = "secret";
export const MONGO_CONNECTION_STRING =
  "mongodb+srv://alandgfr092:GWaiXg5q3s64zs8x@cluster0.eswbahs.mongodb.net/";

export const DB_NAME = "test";
export const USER_COLLECTION = "users";
export const POST_COLLECTION = "posts";
export const LEADERBOARD_COLLECTION = "leaderboard";

export const POINTS_PER_CAPTCHA = 30;
export const POINTS_PER_POST = 7;
export const POINTS_PER_LIKE = 2;
export const POINTS_PER_COMMENT = 3;
