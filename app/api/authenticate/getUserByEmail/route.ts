import { getUserByEmail, getUserById } from "@/utils/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const header = await request.headers;
        const email = header.get('email');
        console.log({email: email})
        // console.log(validatedFields)
        if (email) {
            const user = await getUserByEmail(email);
            console.log({user: user})
            if (!user) {
                return NextResponse.json({ message: 'User not found' }, { status: 401 });
            }
        

            // Return user data if authentication is successful
            return NextResponse.json({ user }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 401 });
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
