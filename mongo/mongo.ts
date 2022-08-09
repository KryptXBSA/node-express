import * as mongoDB from "mongodb";

const url = 'mongodb+srv://test:test@cluster0.wkig6v5.mongodb.net/?retryWrites=true&w=majority';
const client = new mongoDB.MongoClient(url);
let db0: mongoDB.Db
const dbName = 'test';

export async function updateData(collectionName: string, id: string, obj: any, db?: mongoDB.Db) {
  let mainDB = db ? db : db0
  await connect()
  const collection = mainDB.collection(collectionName);
  const updateResult = await collection.updateOne({ id: id }, { $set: { data: obj } });
  db0 && client.close()
  return updateResult;
}
export async function findOne(collectionName: string, obj: mongoDB.Callback<mongoDB.WithId<mongoDB.Document> | null>, db?: mongoDB.Db) {
  let mainDB = db ? db : db0
  await connect()
  const collection = mainDB.collection(collectionName);
  const findResult = await collection.findOne(obj);
  db0 && client.close()
  return findResult;
}
export async function findMany(collectionName: string, obj: mongoDB.Filter<mongoDB.Document>, db?: mongoDB.Db) {
  let mainDB = db ? db : db0
  await connect()
  const collection = mainDB.collection(collectionName);
  const findResult = await collection.find(obj).toArray();
  db0 && client.close()
  return findResult;
}

export async function connect() {
  await client.connect();
  db0 = client.db(dbName);
  return db0
}