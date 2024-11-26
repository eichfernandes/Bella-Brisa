import { Schema, model } from "mongoose";

interface IAdmin{
    cpf: string,
    senha: string
}

const AdminSchema = new Schema<IAdmin>({
    cpf: { type: String, required: true },
    senha: { type: String, required: true }
  });

export const Admin = model<IAdmin>('Admin', AdminSchema);