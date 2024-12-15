import { NextRequest, NextResponse } from "next/server"
import { IUser, User } from "@/models/User";
import { deleteByCPF, findByCPF, listAll, updateByCPF } from "@/services/User";

export async function GET(req: NextRequest, res: NextResponse) {
    const cpf = req.nextUrl.searchParams.get('cpf')
    if (cpf){
        const user = await findByCPF(cpf)
        return NextResponse.json({
            user
        })
    }
    const users = await listAll()
    return NextResponse.json({
        users
    })
}

export async function POST(req: NextRequest) {
    try {
        const userData: IUser = await req.json();

        await new User(userData).save();
        
        return NextResponse.json({
            message: "Usuário salvo com sucesso"
        })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { cpf, updatedData } = await req.json()
        const message = await updateByCPF(cpf, updatedData)

        return NextResponse.json(message);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { cpf } = await req.json()

        await deleteByCPF(cpf);

        return NextResponse.json({
            message: "Usuário removido com sucesso"
        })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

