import { NextResponse } from 'next/server';
import { createUser, getAccountByIdAndProvider, getUserByEmail, getUserById, linkAccount } from '@/utils/user';

export async function POST(request: Request) {
    try {
        const { user, account } = await request.json();
        let existingUser = await getUserById(user.id);
        if (!existingUser) {
            const newUser = await createUser(user.email,user.name,user.id,user.image)
            console.log({new_user: newUser})
            existingUser = newUser || null
        }

        const existingAccount = await getAccountByIdAndProvider(account.providerAccountId, account.provider)
        if (!existingAccount) {
            await linkAccount(existingUser?.id || "",account)
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
