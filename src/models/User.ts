import { usersCollection } from "@/db/db";
import { hashPassword } from "@/services/Auth";
import { updateByCPF, deleteByCPF } from "@/services/User";

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
    try {
      await usersCollection.insertOne({
        id: this.id,
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        senha: await hashPassword(this.senha),
        Horas: this.Horas
      });
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  }

  async update(updateData: Partial<Document>){
    await updateByCPF(this.cpf, updateData);
  }

  async delete(){
      await deleteByCPF(this.cpf)
  }
}

export { User };
