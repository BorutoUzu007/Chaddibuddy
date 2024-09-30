import { and, eq } from "drizzle-orm";
import { users, accounts } from "@/src/schema/user-schema"; // Update with actual path

// Define types using InferModel
type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;

type Account = typeof accounts.$inferSelect;
type NewAccount = typeof accounts.$inferInsert;

type DrizzleAdapterOptions = {
  drizzleInstance: any; // Replace 'any' with the correct type if available
};

export function DrizzleAdapter({ drizzleInstance }: DrizzleAdapterOptions) {
  return {
    async createUser(user: NewUser): Promise<User> {
      const result = await drizzleInstance
        .insert(users)
        .values(user)
        .returning("*")
        .execute();
      return result[0];
    },

    async getUser(id: string): Promise<User | null> {
      const user = await drizzleInstance
        .select(users)
        .where(eq(users.id, id))
        .execute();
      return user[0] || null;
    },

    async getUserByEmail(email: string): Promise<User | null> {
      const user = await drizzleInstance
        .select(users)
        .where(eq(users.email, email))
        .execute();
      return user[0] || null;
    },

    async getUserByAccount({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }): Promise<User | null> {
      const account = await drizzleInstance
        .select(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .execute();
      if (!account.length) return null;

      const user = await drizzleInstance
        .select(users)
        .where(eq(users.id, account[0].userId))
        .execute();
      return user[0] || null;
    },

    async updateUser(user: Partial<User>): Promise<User> {
      const updatedUser = await drizzleInstance
        .update(users)
        .set(user)
        .where(eq(users.id, user.id!))
        .returning("*")
        .execute();
      return updatedUser[0];
    },

    async deleteUser(id: string): Promise<void> {
      await drizzleInstance.delete(users).where(eq(users.id, id)).execute();
    },

    async linkAccount(account: NewAccount): Promise<Account> {
        const normalizedAccount = {
            ...account,
            refresh_token: account.refresh_token ?? null,
            access_token: account.access_token ?? null,
            expires_at: account.expires_at ?? null,
            token_type: account.token_type ?? null,
            scope: account.scope ?? null,
            id_token: account.id_token ?? null,
            session_state: account.session_state ?? null,
          };
        await drizzleInstance.insert(accounts).values(normalizedAccount).execute();
        return normalizedAccount;
    },

    async unlinkAccount({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }): Promise<void> {
      await drizzleInstance
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .execute();
    }
  };
}
