import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { ethers } from "ethers";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Wallet",
      credentials: {
        walletAddress: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.walletAddress || !credentials?.signature) {
          return null;
        }

        try {
          // Verify the signature
          const message = `Sign in to IPL Market with wallet ${credentials.walletAddress}`;
          const recoveredAddress = ethers.verifyMessage(message, credentials.signature);

          if (recoveredAddress.toLowerCase() !== credentials.walletAddress.toLowerCase()) {
            return null;
          }

          // Find or create user
          let user = await prisma.user.findUnique({
            where: {
              walletAddress: credentials.walletAddress,
            },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                walletAddress: credentials.walletAddress,
                username: `User${credentials.walletAddress.slice(0, 6)}`,
              },
            });
          }

          return {
            id: user.id,
            walletAddress: user.walletAddress,
            username: user.username,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.walletAddress = token.walletAddress as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.walletAddress = user.walletAddress;
        token.username = user.username;
      }
      return token;
    },
  },
}; 