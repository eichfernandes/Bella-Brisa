import { AdminSchema } from '@/models/Admin';
import { connect } from 'mongoose';
require('dotenv').config()

connect(process.env.DB_URI);

const test = new AdminSchema({
    cpf: "123456",
    senha: "123456"
})

test.save().then(() => {
    console.log("saved")
})