import { userApi } from "@/backendApi/user";
import { loginAction } from "@/domain-logic/user/login";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email:",
          type: "text",
          placeholder: "test-user/test-specialist",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "test",
        },
      },
      async authorize(credentials) {
        const { user: responseUser, token } = await loginAction(() =>
          userApi.login({
            username: credentials!.username,
            password: credentials!.password,
          }),
        );
        console.log("1", token);

        if (responseUser) {
          const user = {
            id: String(responseUser.id),
            name: responseUser.name,
            username: responseUser.username,
            accessToken: token,
            details: responseUser,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.details = user.details;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.details) {
        session.user.details = token.details;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};
