import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    "cpf": String,
    "senha": String,
});

export default AdminSchema;