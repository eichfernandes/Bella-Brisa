import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt-ts";

declare var process:{
    env: {
        JWT_SECRET: string;
    }
}

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT
export function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// Verify JWT
export function verifyToken(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, JWT_SECRET);
}

// Hash password with bcrypt
export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

// Compare plain text password with hashed password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
}