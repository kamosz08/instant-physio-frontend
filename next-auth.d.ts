// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { User as UserType } from "./src/domain-logic/user/login";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      details: UserType;
      accessToken: string;
      expireTime: number;
    };
    error?: "RefreshAccessTokenError";
  }

  interface User extends DefaultUser {
    details: UserType;
    accessToken: string;
    refreshToken: string;
    expireTime: number;
  }

  // interface Profile { }

  // interface Account { }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    details: UserType;
    accessToken: string;
    refreshToken: string;
    expireTime: number;
    error?: "RefreshAccessTokenError";
  }
}
