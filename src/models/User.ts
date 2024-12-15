import { usersCollection } from "@/db/db";
import { hash, compare } from "bcrypt-ts";
import { SignJWT } from "jose";

import { updateByCPF, deleteByCPF, findByCPF, findById, userAlreadyExists } from "@/services/User";

declare var process:{
  env: {
      JWT_SECRET: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

export interface IUser{
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

class User{
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  Horas: {
    data: string;
    checkIn: Date | null;
    checkOut: Date | null;
    almocoIn: Date | null;
    almocoOut: Date | null;
  }[];

  constructor(userData: IUser) {
    this.id = userData.id;
    this.nome = userData.nome;
    this.email = userData.email;
    this.cpf = userData.cpf;
    this.senha = userData.senha;
    this.Horas = [];
  }

  async save() {
    if (!this.id || !this.nome || !this.email || !this.cpf || !this.senha){
      throw new Error("Usuário possui campos em branco")
    }
    if (await userAlreadyExists(this)){
      throw new Error("Funcionário com id ou cpf já existente.")
    }
    await usersCollection.insertOne({
      id: this.id,
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      senha: await hash(this.senha, 10),
      Horas: this.Horas
    });
  }

  async update(updateData: Partial<Document>){
    if (await userAlreadyExists(this)){
      throw new Error("Funcionário com id ou cpf já existente.")
    }
    await updateByCPF(this.cpf, updateData);
  }

  async delete(){
      await deleteByCPF(this.cpf)
  }

  async generateToken(): Promise<string>{
    return new SignJWT({ cpf: this.cpf })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
    .setExpirationTime('1h')  // Set expiration time
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  }
}


export { User };
