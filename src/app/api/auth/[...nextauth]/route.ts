import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt-ts";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!(credentials?.email && credentials.password)) {
          throw new Error("Invalid credentials");
        }
        // Periksa apakah pengguna ada di database
        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error("Akun tidak ditemukan");
        }
        // Validasi password
        const comparePassword = await compare(
          credentials?.password,
          user.password
        );
        if (!comparePassword) {
          throw new Error("Password salah");
        }
        // Kembalikan objek user tanpa password
        const userNoPass: any = await prisma.users.findUnique({
          where: { email: credentials?.email },
          select: {
            user_id: true,
            username: true,
            email: true,
            role: true,
            phoneNumber: true,
            imgUrl: true,
          },
        });

        return userNoPass;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user_id = user.user_id;
        token.email = user.email;
        token.role = user.role;
        token.username = user.username;
        token.phonen = user.phoneNumber;
        token.imgUrl = user.imgUrl;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.user_id = token.user_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
