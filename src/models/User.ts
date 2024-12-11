import { usersCollection } from "@/db/db";
import { hashPassword } from "@/services/Auth";
import { updateByCPF, deleteByCPF } from "@/services/User";

class User {
  nome: string;
  cpf: string;
  senha: string;
  Horas: {
    checkIn: Date | null;
    checkOut: Date | null;
    almocoIn: Date | null;
    almocoOut: Date | null;
  }[];

  constructor(nome: string, cpf: string, senha: string) {
    this.nome = nome;
    this.cpf = cpf;
    this.senha = senha;
    this.Horas = [];
  }

  async save() {
    try {
      await usersCollection.insertOne({
        nome: this.nome,
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
