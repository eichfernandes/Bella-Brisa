import { MongoClient } from "mongodb";

declare var process : {
  env: {
    DB_URI : string
  }
}

let db: any;

export const connectToDatabase = async () => {
  if (db) return db;

  const client = await MongoClient.connect(process.env.DB_URI);
  db = client.db("bella-brisa");
  console.log("Connected to database.");
  
  return db;
};

export const Users = {
  insertOne: (doc: any) => db.collection("users").insertOne(doc),
  findOne: (query: any) => db.collection("users").findOne(query),
  updateOne: (query: any, update: any) => db.collection("users").updateOne(query, update),
  deleteOne: (query: any) => db.collection("users").deleteOne(query),
  find: () => db.collection("users").find(),
};