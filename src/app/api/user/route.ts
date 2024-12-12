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
            message: "User saved sucessfully"
        })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong.' })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const userData: IUser = await req.json()
        const message = await updateByCPF(userData.cpf, userData)

        return NextResponse.json(message)
    } catch (error: any) {
        return NextResponse.json({ error: 'Something went wrong.' })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { cpf } = await req.json()

        await deleteByCPF(cpf);

        return NextResponse.json({
            message: "User removed successfully."
        })
    } catch (error: any) {
        return NextResponse.json({ error: 'Something went wrong.' })
    }
}

