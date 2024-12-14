import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/services/Auth";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const {id, senha} = await req.json();
        const token = await authenticate({id, senha})
        
        const res = NextResponse.json({ message: 'Login successful' });

        res.cookies.set('token', token, {
        httpOnly: true, // Secure the cookie by making it inaccessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
        maxAge: 60 * 60,  // 1 hour expiration time
        path: '/', // Cookie is accessible to all pages
        });

        return res;
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export async function DELETE() {
    const response = NextResponse.json({ message: 'Logged out successfully' });
  
    // Delete the 'auth_token' cookie
    response.cookies.delete('token');
  
    return response;
}