import { usersCollection } from "@/db/db";
import { Document } from "mongodb";

export async function findByCPF(cpf: string): Promise<Document | null> {
    return await usersCollection.findOne({ cpf });
}

// Update: Update user details by CPF
export async function updateByCPF(cpf: string, updateData: Partial<Document>) {
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

// Delete: Remove an user by CPF
export async function deleteByCPF(cpf: string) {
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

// List All: Retrieve all users
export async function listAll(): Promise<Array<Document>>{
  try {
    const admins = await usersCollection.find().toArray();
    return admins;
  } catch (error) {
    console.error("Error retrieving admins:", error);
    return [];
  }
}