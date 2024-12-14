import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const loginUrl = new URL('/login', req.url);
  const pontoUrl = new URL('/ponto', req.url);

  if (!token) {
    return NextResponse.json(
      { message: "Faça login primeiro." },
      { status: 401 }
    );
  }

  try {
    const token = req.cookies.get('token')?.value as string;
    const { cpf } = (await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))).payload as {cpf: string};
    if (cpf === process.env.CNPJ_CLIENTE) return NextResponse.next();
    
    if (req.nextUrl.pathname.startsWith("/ponto") || req.nextUrl.pathname.startsWith("/api/ponto")) return NextResponse.next();

    return NextResponse.redirect(pontoUrl);

  } catch (err) {
    console.error('JWT validation error:', err);
    return NextResponse.redirect(loginUrl); // Redirect to login if token is invalid
  }
}

export const config = {
  matcher: [
    '/cadastro-funcionario',
    '/controle',
    '/editar-funcionario',
    '/ponto',
    '/previsao',
    '/relatorio',
    '/rh',
    '/trocar-senha',
    '/api/user',
    '/api/ponto'
  ]
};
