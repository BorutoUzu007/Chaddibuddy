import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          console.log({account: account})
            // Create a new user if not existing

            await fetch(`${process.env.NEXTAUTH_URL}/api/authenticate/createUserForProvider`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({'user': user, 'account': account}),
            });
        } catch (error) {
          console.error("Error storing user data:", error);
          return false; // Return false to stop the sign-in process if there's an error
        }
      }
      
      return true; // Return true to proceed with the sign-in
    },
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      console.log({session: session})
      return session
    },
    async jwt({ token }) {
      // console.log({token})
      if (token && token.sub) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/authenticate/getUserByEmail`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'email': token.email || "" },
          // body: token.sub,
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        console.log({data: data})
        
        token.sub = data.user.id
        console.log({token: token})

      }
      return token
    }
  },
  session: { strategy: "jwt" },
  trustHost: true,
  ...authConfig
})