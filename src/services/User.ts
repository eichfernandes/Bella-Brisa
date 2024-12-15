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
export async function updateByCPF(cpf: string, updatedData: Partial<Document>) {
  try {
    let { senha } = updatedData;
    if (senha){
      updatedData.senha = await hash(senha, 10);
    }

    const result = await usersCollection.updateOne(
      { cpf },
      { $set: updatedData }
    );
    if (result.matchedCount > 0) {
      return { message: "Usuário atualizado com sucesso" }
    } else {
      return { message: "Nenhum usuário foi encontrado para ser atualizado" }
    }
  } catch (error) {
    console.error("Erro na atualização do usuário:", error);
  }
}

// Delete: Remove an user by CPF
export async function deleteByCPF(cpf: string) {
  try {
    const result = await usersCollection.deleteOne({ cpf });
    if (result.deletedCount > 0) {
      console.log("Usuário removido com sucesso");
    } else {
      console.log("Nenhum usuário encontrado para ser removido");
    }
  } catch (error) {
    console.error("Erro na remoção do usuário:", error);
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
    console.error("Erro na entrega dos usuários:", error);
    return [];
  }
} 