let production = false;
export const SERVER_URL = production
  ? "https://node-express-api.kurdmake.com"
  : "http://localhost:7002";
export const IMAGE_SERVER_URL = production
  ? "https://node-express-api.kurdmake.com/images"
  : "http://localhost:7002/images";
export const SOCKER_SERVER_URL = production
  ? "https://node-express-socket.kurdmake.com"
  : "http://localhost:7004";

