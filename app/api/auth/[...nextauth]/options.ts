import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  // on login you get the user but only once. have to capture it to token
  callbacks: {
    async jwt({ token, user, session }) {
      // token.id = user.id
      // return session
      if (user) {
        if ((user as User).role == null) (user as User).role == "buyer";
        return {
          ...token,
          id: user.id,
          role: (user as User).role,
          country: (user as User).country || "Fiji",
          adress: (user as User).address,
        };
      }

      return token;
    },
    // after capturing user info in the token have to pass it to session.
    async session({ session, token, user }) {
      // session.id = token.id
      // return session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          country: token.country,
          adress: token.address,
          town: token.city,
        },
      };
    },
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
