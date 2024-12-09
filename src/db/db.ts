import { Admin } from "@/models/Admin";
import { Collection, Db, MongoClient } from "mongodb";

declare var process: {
  env: {
    DB_URI: string;
  }
};
let db: any;

async function connect(): Promise<Db> {
  if (db) return db;
  
  const client = await MongoClient.connect(process.env.DB_URI);
  db = client.db("bella-brisa");
  console.log("Connected to database.");
  
  return db;
};

db = await connect()
const usersCollection = db.collection("users")

export { usersCollection }