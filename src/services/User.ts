import { usersCollection } from "@/db/db";
import { Document } from "mongodb";
import { hash } from "bcrypt-ts";
import { IUser } from "@/models/User";

export async function findByCPF(cpf: string): Promise<Document | null> {
    return await usersCollection.findOne({ cpf }, { projection: { senha: 0 }});
}
export async function findById(id: string): Promise<Document | null> {
    return await usersCollection.findOne({ id }, { projection: { senha: 0 }});
}

export async function userAlreadyExists(user: IUser): Promise<boolean>{
  const result = await Promise.all([findByCPF(user.cpf), findById(user.id)])
    if (result[0] || result[1]){
      return true;
    }
    return false;
}

// Update: Update user details by CPF
export async function updateByCPF(cpf: string, updateData: Partial<Document>) {
  try {
    let { senha } = updateData;
    if (senha){
      updateData.senha = await hash(senha, 10);
    }

    const result = await usersCollection.updateOne(
      { cpf },
      { $set: updateData }
    );
    if (result.matchedCount > 0) {
      return { message: "User updated successfully" }
    } else {
      return { message: "No User found to be update" }
    }
  } catch (error) {
    console.error("Error updating User:", error);
  }
}

// Delete: Remove an user by CPF
export async function deleteByCPF(cpf: string) {
  try {
    const result = await usersCollection.deleteOne({ cpf });
    if (result.deletedCount > 0) {
      console.log("User deleted successfully");
    } else {
      console.log("No User found to delete");
    }
  } catch (error) {
    console.error("Error deleting User:", error);
  }
}

// List All: Retrieve all users
export async function listAll(): Promise<Array<Document>>{
  try {
    const users = await usersCollection.find({
      "id": {
        $not: {
          $regex: "0000|0001"
        }
      }
    }, { projection: { senha: 0 } }).toArray();

    return users;
  } catch (error) {
    console.error("Error retrieving Users:", error);
    return [];
  }
} 