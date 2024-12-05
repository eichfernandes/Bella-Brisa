import { MongoClient } from 'mongodb';
require('dotenv').config()

declare var process : {
    env: {
      DB_URI : string
    }
}

const client = new MongoClient(process.env.DB_URI);

const db = client.db('bella-brisa');
const Users = db.collection('usuarios')

export { Users };