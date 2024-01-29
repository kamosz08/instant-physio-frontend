import { backendApi } from "@/backendApi";
import { refreshTokenAction } from "@/domain-logic/authUser/refreshToken";
import { loginAction } from "@/domain-logic/user/login";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
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
        const {
          user: responseUser,
          accessToken,
          refreshToken,
          expireTime,
        } = await loginAction(() =>
          backendApi.user.login({
            username: credentials!.username,
            password: credentials!.password,
          }),
        );

        cookies().set("refreshToken", refreshToken, {
          secure: true,
          httpOnly: true,
        });

        if (responseUser) {
          const user = {
            id: String(responseUser.id),
            name: responseUser.name,
            username: responseUser.username,
            accessToken: accessToken,
            expireTime: expireTime,
            details: responseUser,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login", signOut: "/login" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.details = user.details;
        token.accessToken = user.accessToken;
        token.expireTime = user.expireTime;
      }

      if (trigger === "update" && typeof session?.credits === "number") {
        token.details.credits = session?.credits;
      }

      // Token has expired, try refresh token
      if (Date.now() > token.expireTime) {
        const currentRefreshToken = cookies().get("refreshToken");
        if (!currentRefreshToken) {
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }

        try {
          const { accessToken, refreshToken, expireTime } =
            await refreshTokenAction(() =>
              backendApi.user.refreshToken({
                refreshToken: currentRefreshToken.value,
              }),
            );

          cookies().set("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
          });

          token.accessToken = accessToken;
          token.expireTime = expireTime;
        } catch (error) {
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.details) {
        session.user.details = token.details;
        session.user.accessToken = token.accessToken;
      }

      session.error = token.error;

      return session;
    },
  },
};
