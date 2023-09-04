import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextApiRequest, NextApiResponse } from "next"
import { AdapterUser } from "next-auth/adapters"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req): Promise<AdapterUser | null> => {
        const validateUser = await fetch(
          `https://matrixapi.frackment.id/api/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const dataUser = await validateUser.json()

        if (!dataUser.success) {
          return null
        }

        // localStorage.setItem("access_token", dataUser.data.token)

        return {
          id: "",
          email: "",
          emailVerified: new Date(),
          // token: dataUser.data.token,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
