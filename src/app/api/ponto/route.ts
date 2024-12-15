import { NextRequest, NextResponse } from "next/server"
import { findByCPF, updateByCPF } from "@/services/User";
import { getCpfByToken } from "@/services/Auth";

export async function GET(req: NextRequest, res: NextResponse) {
    const cpf = await getCpfByToken(req);
    const user = await findByCPF(cpf)
    return NextResponse.json({
        user
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const cpf = await getCpfByToken(req);
        const { tipo } = await req.json();
  
        // Validate input
        if (!tipo) {
            return NextResponse.json(
            { error: "CPF e tipo são campos obrigatórios" },
            { status: 500 }
            );
        }
    
        // Find the user by CPF
        console.log(cpf);
        const user = await findByCPF(cpf);
        if (!user) {
            return NextResponse.json(
            { error: `Nenhum usuário CPF: ${cpf} foi encontrado` },
            { status: 404 }
            );
        }
    
        // Find or create today's registro
        const hoje = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
        let hojeRegistro = user.Horas.find(
            (registro: { data: string }) => registro.data === hoje
        );
    
        if (!hojeRegistro) {
            hojeRegistro = {
            data: hoje,
            checkIn: null,
            checkOut: null,
            almocoIn: null,
            almocoOut: null,
            };
            user.Horas.push(hojeRegistro);
        }
    
        // Update the appropriate time field
        const tiposValidos = ["checkIn", "checkOut", "almocoIn", "almocoOut"];
        if (!tiposValidos.includes(tipo)) {
            return NextResponse.json(
            { error: "Tipo inválido. Deve ser: checkIn, checkOut, almocoIn, almocoOut" },
            { status: 500 }
            );
        }
    
        hojeRegistro[tipo] = new Date();
    
        // Update the user in the database
        await updateByCPF(cpf, { Horas: user.Horas });
    
        return NextResponse.json({
            message: "Horas registradas"
        });
        } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro inesperado" },
            { status: 500 }
        );
    }
}