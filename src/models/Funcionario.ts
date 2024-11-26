import { timeStamp } from "console";
import mongoose from "mongoose";

const FuncionarioSchema = new mongoose.Schema({
    "cpf": String,
    "senha": String,
    "Horas": [
        {
            "check-in": timeStamp,
            "check-out": timeStamp,
            "almoco-in": timeStamp,
            "almoco-out": timeStamp,
        }
    ]
});

export default FuncionarioSchema;