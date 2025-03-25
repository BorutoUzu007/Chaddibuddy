import 'server-only'
import { db } from "@/lib/db"
import { accounts, users } from "@/src/schema/user-schema"
import { and, eq } from "drizzle-orm"

type User = typeof users.$inferSelect;
type Account = typeof accounts.$inferInsert;
export const getUserByEmail = async(email: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.email, email.toLowerCase()))
        return user[0]
    } catch(error) {
        console.log(`Get user by email error: ${error}`)
        return null
    }
}

export const createUser = async(email: string, name: string, googleId: string, image: string) => {
    try {
        const newUser = await db.insert(users).values({
            email: email,
            name: name,
            id: googleId,
            image: image,
        }).returning()
        return newUser[0]
    } catch {
        return null
    }
}

export const getUserById = async(id: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.id, id))
        return user[0]
    } catch {
        return null
    }
}

export const getUserByAccount = async(provider: string, providerAccountId: string): Promise<User | null> => {
    const account = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .execute();
      if (!account.length) return null;

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, account[0].userId))
        .execute();
      return user[0] || null;
}
export const deleteUserById = async (id: string): Promise<void> => {
    await db.delete(users).where(eq(users.id, id)).execute();
}

export const linkAccount = async(userId: string, account: Account) => {
    console.log({user_id: userId})
    try {
        const normalizedAccount = {
            ...account,
            userId: userId
        };
        await db.insert(accounts).values(normalizedAccount).execute();
        return normalizedAccount;
    } catch (error) {
        console.log(`Error happened here!!!! ${error}`)
    }
}

export const unlinkAccount = async (provider: string, providerAccountId: string) => {
    await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .execute();
}

export const getAccountByIdAndProvider = async (id: string, provider: string) => {
    const account = await db.select().from(accounts).where(
        and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, id)
          )
    )
    .execute()
    return account[0]
}

export const updateUserByID = async (data: Partial<User>, userId: string) => {
    try {
        const result = db.update(users)
                     .set(data)
                     .where((eq(users.id, userId)))
        
        return result
    } 
    catch (err) {
        return null
    }
}