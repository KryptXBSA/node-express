import * as dotenv from "dotenv";
import * as _ from "lodash";
import * as path from "path";

dotenv.config({ path: ".env" });

export const PORT = _.defaultTo(parseInt(process.env.PORT!), 7002);
export const JWT_SECRET = _.defaultTo(process.env.JWT_SECRET, "secret");
export const MONGO_CONNECTION_STRING = _.defaultTo(process.env.MONGO_CONNECTION_STRING, 'mongodb+srv://test:test@cluster0.wkig6v5.mongodb.net/?retryWrites=true&w=majority');
export const DB_NAME = _.defaultTo(process.env.DB_NAME, "test");
export const MAIN_COLLECTION = _.defaultTo(process.env.MAIN_COLLECTION, "test");
