import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Email:",
                    type: "text",
                    placeholder: "test-user/test-specialist"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "test"
                }
            },
            async authorize(credentials) {
                const { token } = await fetch("http://localhost:8000/api/v1/users/login", {
                    method: "POST", body: JSON.stringify({
                        "username": credentials?.username,
                        "password": credentials?.password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(res => res.json());

                const response = await fetch("http://localhost:8000/api/v1/users/me",
                    { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json());

                if (response.data) {
                    const user = {
                        id: response.data.id,
                        name: response.data.name,
                        username: response.data.username,
                        accessToken: token,
                        details: response.data
                    }
                    return user
                }
                return null

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.details = user.details
                token.accessToken = user.accessToken
            }

            return token
        },
        async session({ session, token }) {
            if (session.user && token.details) {
                session.user.details = token.details
                session.user.accessToken = token.accessToken
            }

            return session
        },
    }
}