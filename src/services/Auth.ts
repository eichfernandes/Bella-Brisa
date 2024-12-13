import { usersCollection } from "@/db/db";
import { compare } from "bcrypt-ts"
import { User, IUser } from "@/models/User";

export async function authenticate(userCredentials: {
    id: string,
    senha: string
}): Promise<string | null> {
    const { id, senha } = userCredentials;

    // const [res1, res2] = await Promise.all([usersCollection.findOne({ cpf: id }), usersCollection.findOne({ id })])
    // const user = res1 || res2;
    const user = await usersCollection.findOne<IUser>({cpf: id});
    
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const instance = new User(user);
    return instance.generateToken();
  }