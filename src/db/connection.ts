import { Admin } from '@/models/Admin';
import { connect, model } from 'mongoose';
require('dotenv').config()

declare var process : {
    env: {
      DB_URI : string
    }
}

connect(process.env.DB_URI);

const test = new Admin({
    cpf: "123",
    senha: "123"
});

test.save().then(() => {
    console.log("saved");
})