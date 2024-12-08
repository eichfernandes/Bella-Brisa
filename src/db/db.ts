import { MongoClient } from "mongodb";

declare var process: {
  env: {
    DB_URI: string;
  }
};
let db: any;

const connect = async () => {
  if (db) return db;
  
  const client = await MongoClient.connect(process.env.DB_URI);
  db = client.db("bella-brisa");
  console.log("Connected to database.");
  
  return db;
};

const usersCollection = await connect()
  .then((db) => db.collection("users"))
  .catch((error: any) => console.log(error));

export {connect, usersCollection}