import { usersCollection } from "@/db/db";
import { compare } from "bcrypt-ts"
import { User, IUser } from "@/models/User";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function authenticate(userCredentials: {
    id: string,
    senha: string
}): Promise<string> {
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
    return await instance.generateToken();
}

export async function getCpfByToken(req: NextRequest){
    const token = req.cookies.get('token')?.value as string;
    const { cpf } = (await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))).payload as {cpf: string};
    return cpf;
}