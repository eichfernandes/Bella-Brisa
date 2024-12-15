import { NextRequest, NextResponse } from "next/server";
import { updateByCPF } from "@/services/User";
import { authenticate, getCpfByToken } from "@/services/Auth";


export async function POST(req: NextRequest) {
    try {
        const cpf = await getCpfByToken(req);
        const { senhaOld, senha } = await req.json()

        await authenticate({ id: cpf, senha: senhaOld })
        

        const message = await updateByCPF(cpf, {senha})

        return NextResponse.json(message);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}