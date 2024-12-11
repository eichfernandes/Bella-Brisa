import { NextRequest, NextResponse } from "next/server"

 
export async function POST(req: NextRequest) {
  try {
    const { cpf, senha } = await req.json()
    
    return NextResponse.json({
        message: {cpf, senha}
    })
  } catch (error: any) {
    if (error.type === 'CredentialsSignin') {
        return NextResponse.json({ error: 'Invalid credentials.' })
    } else {
        return NextResponse.json({ error: 'Something went wrong.' })
    }
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({
        message: "get request"
    })
}