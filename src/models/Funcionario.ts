import { usersCollection } from "../db/db"; // Ensure the correct path to your DB connection

class Funcionario {
  cpf: string;
  senha: string;
  Horas: {
    checkIn: Date | null;
    checkOut: Date | null;
    almocoIn: Date | null;
    almocoOut: Date | null;
  }[];

  constructor(cpf: string, senha: string, Horas: Funcionario["Horas"] = []) {
    this.cpf = cpf;
    this.senha = senha;
    this.Horas = Horas;
  }

  // Save a new Funcionario
  async save() {
    await usersCollection.insertOne({
      cpf: this.cpf,
      senha: this.senha,
      Horas: this.Horas,
    });
  }

  // Find a Funcionario by CPF
  static async findByCPF(cpf: string) {
    return await usersCollection.findOne({ cpf });
  }

  // Update a Funcionario by CPF
  static async updateByCPF(cpf: string, updateData: Partial<Funcionario>) {
    const result = await usersCollection.updateOne({ cpf }, { $set: updateData });
    return result.modifiedCount > 0;
  }

  // Delete a Funcionario by CPF
  static async deleteByCPF(cpf: string) {
    const result = await usersCollection.deleteOne({ cpf });
    return result.deletedCount > 0;
  }

  // Add a new Hora record
  static async addHora(cpf: string, hora: Funcionario["Horas"][0]) {
    const result = await usersCollection.updateOne(
      { cpf },
      { $push: { Horas: hora } }
    );
    return result.modifiedCount > 0;
  }

  // List all Funcionarios
  static async listAll() {
    return await usersCollection.find({}).toArray();
  }
}

export { Funcionario };
