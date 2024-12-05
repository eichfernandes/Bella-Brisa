import { Users } from "../db/db";

class Admin {
  cpf : string = "";
  senha : string = "";
 
  constructor(cpf: string, senha: string){
    this.cpf = cpf;
    this.senha = senha;
  }

  async save() {
      await Users.insertOne({
        cpf: this.cpf,
        senha: this.senha
      })
  }
}

export {Admin};