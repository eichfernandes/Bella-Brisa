import { usersCollection } from "@/db/db";

class Admin {
  cpf: string;
  senha: string;

  constructor(cpf: string, senha: string) {
    this.cpf = cpf;
    this.senha = senha;
  }

  // Create: Save the Admin instance to the database
  async save() {
    try {
      const result = await usersCollection.insertOne({
        cpf: this.cpf,
        senha: this.senha,
      });
      console.log("Admin saved:", result.insertedId);
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  }

  // Read: Find an admin by CPF
  static async findByCPF(cpf: string) {
    try {
      const admin = await usersCollection.findOne({ cpf });
      return admin || null; // Return admin or null if not found
    } catch (error) {
      console.error("Error finding admin by CPF:", error);
      return null;
    }
  }

  // Update: Update admin details by CPF
  static async updateByCPF(cpf: string, updateData: Partial<Admin>) {
    try {
      const result = await usersCollection.updateOne(
        { cpf },
        { $set: updateData }
      );
      if (result.matchedCount > 0) {
        console.log("Admin updated successfully");
      } else {
        console.log("No admin found to update");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  }

  // Delete: Remove an admin by CPF
  static async deleteByCPF(cpf: string) {
    try {
      const result = await usersCollection.deleteOne({ cpf });
      if (result.deletedCount > 0) {
        console.log("Admin deleted successfully");
      } else {
        console.log("No admin found to delete");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  }

  // List All: Retrieve all admins
  static async listAll() {
    try {
      const admins = await usersCollection.find().toArray();
      return admins;
    } catch (error) {
      console.error("Error retrieving admins:", error);
      return [];
    }
  }
}

export { Admin };
