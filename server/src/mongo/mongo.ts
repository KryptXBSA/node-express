import { DB_NAME, MONGO_CONNECTION_STRING } from '../../config';
import * as mongoDB from "mongodb";

const url: string = MONGO_CONNECTION_STRING
const client = new mongoDB.MongoClient(url);
let db0: mongoDB.Db
const dbName = DB_NAME;

export async function insertOne(collectionName: string, obj: any, db?: mongoDB.Db) {
  let mainDB = db ? db : await connect()
  const collection = mainDB.collection(collectionName);
  const insertResult = await collection.insertOne(obj);
  // !db && client.close()
  return insertResult;
}
export async function updateOne(collectionName: string, find: any, update: any, db?: mongoDB.Db) {
  let mainDB = db ? db : await connect()
  const collection = mainDB.collection(collectionName);
  const updateResult = await collection.updateOne(find, update);
  // !db && client.close()
  return updateResult;
}
export async function findPagination(collectionName: string,skip:number,limit:number,sort:any, obj?: any, db?: mongoDB.Db) {
  let mainDB = db ? db : await connect()
  const collection = mainDB.collection(collectionName);
  const findResult: any = await collection.find(obj).skip(skip).limit(limit).sort(sort).toArray();
//  !db && client.close()
  return findResult;
}

export async function findOne(collectionName: string, obj: any, db?: mongoDB.Db) {
  let mainDB = db ? db : await connect()
  const collection = mainDB.collection(collectionName);
  const findResult: any = await collection.findOne(obj);
//  !db && client.close()
  return findResult;
}
export async function findMany(collectionName: string, obj: mongoDB.Filter<mongoDB.Document>, db?: mongoDB.Db) {
  let mainDB = db ? db : await connect()
  const collection = mainDB.collection(collectionName);
  const findResult:any = await collection.find(obj).toArray();
  // !db && client.close()
  return findResult;
}

export async function connect() {
  await client.connect();
  db0 = client.db(dbName);
  return db0
}