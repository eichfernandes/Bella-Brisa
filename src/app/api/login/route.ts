import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/services/Auth";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const {id, senha} = await req.json();
        const token = await authenticate({id, senha})
        return NextResponse.json({
            token
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}