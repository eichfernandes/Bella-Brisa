import { NextRequest, NextResponse } from "next/server"
import { findByCPF, updateByCPF } from "@/services/User";
import { getCpfByToken } from "@/services/Auth";

export async function GET(req: NextRequest) {
    const cpf = await getCpfByToken(req);
    const user = await findByCPF(cpf)
    return NextResponse.json({
        user
    })
}

export async function POST(req: NextRequest) {
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
    
        // Encontra usuario pelo CPF
        console.log(cpf);
        const user = await findByCPF(cpf);
        if (!user) {
            return NextResponse.json(
            { error: `Nenhum usuário CPF: ${cpf} foi encontrado` },
            { status: 404 }
            );
        }
    
        // Pega o ultimo registro ou cria um se necessário
        const ultimoRegistro = user.Horas[user.Horas.length - 1]; // Last registro

        // Define a função que cria um novo registro
        const criarNovoRegistro = () => ({
            data: formatUTCtoBrasilia(new Date()).toISOString().split("T")[0],
            checkIn: null,
            checkOut: null,
            almocoIn: null,
            almocoOut: null,
        });

        // Verifica se é necessário criar um novo registro
        let registroAtual;
        if (!ultimoRegistro || ultimoRegistro.checkOut) {
            // Criar um novo registro se o último tem checkOut ou não existe
            registroAtual = criarNovoRegistro();
            user.Horas.push(registroAtual);
        } else {
            // Usar o último registro se ele não possui checkOut
            registroAtual = ultimoRegistro;
        }
    
         // Atualiza o campo apropriado no registro
         const tiposValidos = ["checkIn", "checkOut", "almocoIn", "almocoOut"];
         if (!tiposValidos.includes(tipo)) {
             return NextResponse.json(
                 { error: "Tipo inválido. Deve ser: checkIn, checkOut, almocoIn, almocoOut" },
                 { status: 500 }
             );
         }
 
         registroAtual[tipo] = formatUTCtoBrasilia(new Date());
 
         // Atualiza o usuário no banco de dados
         await updateByCPF(cpf, { Horas: user.Horas });
 
         return NextResponse.json({
             message: "Horas registradas",
         });
     } catch (error: any) {
         console.error(error);
         return NextResponse.json(
             { error: "Erro inesperado" },
             { status: 500 }
         );
     }
 } 

function formatUTCtoBrasilia(date: Date) {
    const brasiliaOffset = -3; // UTC -3 para o horário de Brasília

    // Cria um novo objeto Date ajustando o fuso horário
    const brasiliaDate = new Date(date);
    brasiliaDate.setHours(brasiliaDate.getHours() + brasiliaOffset);

    return brasiliaDate;
}