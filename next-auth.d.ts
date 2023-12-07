// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { User as UserType } from './src/types/User'

declare module "next-auth" {
    interface Session {
        user: DefaultUser & { details: UserType, accessToken: string }
    }

    interface User extends DefaultUser { details: UserType, accessToken: string }

    // interface Profile { }

    // interface Account { }

}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT { details: UserType, accessToken: string }

}