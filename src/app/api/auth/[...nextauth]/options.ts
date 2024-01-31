import { backendApi } from "@/backendApi";
import { refreshTokenAction } from "@/domain-logic/authUser/refreshToken";
import { loginAction } from "@/domain-logic/user/login";
import { fetchClient } from "@/utils/fetch/fetchClient";
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

        // cookies().set("refreshToken", refreshToken, {
        //   secure: true,
        //   httpOnly: true,
        // });

        if (responseUser) {
          const user = {
            id: String(responseUser.id),
            name: responseUser.name,
            username: responseUser.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
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
        token.sub = user.id;
        token.details = user.details;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expireTime = user.expireTime;
        token.error = undefined;
      }

      if (trigger === "update" && typeof session?.credits === "number") {
        token.details.credits = session?.credits;
      }

      // Token has expired, try refresh token
      if (Date.now() > token.expireTime) {
        const currentRefreshToken = token.refreshToken;
        // const currentRefreshToken = cookies().get("refreshToken");
        if (!currentRefreshToken) {
          console.log("jwt, brak currentRefreshToken z cookies");

          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }

        try {
          const { accessToken, refreshToken, expireTime } =
            await refreshTokenAction(() =>
              backendApi.user.refreshToken({
                refreshToken: currentRefreshToken,
              }),
            );

          // cookies().set("refreshToken", refreshToken, {
          //   secure: true,
          //   httpOnly: true,
          // });

          token.accessToken = accessToken;
          token.refreshToken = refreshToken;
          token.expireTime = expireTime;
          token.error = undefined;
          console.log("jwt, token refreshed");
        } catch (error) {
          console.log("jwt, some error", error);

          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }

      console.log("jwt, set Authorization header");
      fetchClient.setDefaultServerHeaders({
        Authorization: `Bearer ${token.accessToken}`,
      });

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.details && token.sub) {
        session.user.id = token.sub;
        session.user.details = token.details;
        session.user.accessToken = token.accessToken;
      }

      session.error = token.error;

      return session;
    },
  },
};
