import { type NextRequest, NextResponse } from "next/server";
import db from '@/db';
import userSchema from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { name, email, role, category } = await req.json();
        const isValid = await userSchema.isValid({ name, email, role, category });

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        if(!email || !role || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, {status: 400});
        }

        const existingUser = await db.user.findUnique({
            where: {
                email: email
            }
        })
        
        if(existingUser) {
            return NextResponse.json({ message: 'User already signed up for the beta access' }, { status: 409 });
        }

        const user = await db.user.create({
            data: {
                name: name || 'Anonymous',
                email,
                role,
                category
            }
        });

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await db.user.findMany();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
