import { usersCollection } from "@/db/db";
import { hashPassword } from "@/services/Auth";
import { updateByCPF, deleteByCPF } from "@/services/User";

class User {
  cpf: string;
  senha: string;

  constructor(cpf: string, senha: string) {
    this.cpf = cpf;
    this.senha = senha;
  }

  async save() {
    try {
      await usersCollection.insertOne({
        cpf: this.cpf,
        senha: await hashPassword(this.senha),
      });
      console.log("Admin saved successfully");
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  }

  async update(){
    // await updateByCPF(this.cpf, udpat);
  }

  async delete(){
      await deleteByCPF(this.cpf)
  }
}

export { User };
