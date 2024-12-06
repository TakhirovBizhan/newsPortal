import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid credentials");
        }
        return user; // Возвращаем объект пользователя
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin; // Добавляем роль пользователя
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, isAdmin: token.isAdmin }; // Передаем роль в сессию
      return session;
    },
  },
});