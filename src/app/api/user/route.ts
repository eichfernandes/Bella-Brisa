import { NextRequest, NextResponse } from "next/server"
import { IUser, User } from "@/models/User";
import { deleteByCPF, findByCPF, listAll, updateByCPF } from "@/services/User";
import { authenticate } from "@/services/Auth";

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

export async function PATCH(req: NextRequest) {
    try {
      const { cpf, tipo } = await req.json();
  
      // Validate input
      if (!cpf || !tipo) {
        return NextResponse.json(
          { error: "CPF e tipo are required." },
          { status: 400 }
        );
      }
  
      // Find the user by CPF
      const user = await findByCPF(cpf);
      if (!user) {
        return NextResponse.json(
          { error: `No user found with CPF: ${cpf}` },
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
          { error: "Tipo inválido. Deve ser: checkIn, checkOut, almocoIn, almocoOut." },
          { status: 400 }
        );
      }
  
      hojeRegistro[tipo] = new Date();
  
      // Update the user in the database
      await updateByCPF(cpf, { Horas: user.Horas });
  
      return NextResponse.json({
        message: "Horas registradas."
      });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
}