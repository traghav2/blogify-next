import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { authConfig } from '../auth.config';

const login = async (credentials) => {
    try {
        // console.log(credentials.password);
        const user = await db.user.findUnique({
            where: { username: credentials.username },
        });

        if (!user) {
            throw new Error("Wrong Credentials!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Wrong Credentials');
        }

        return user;
    } catch (error) {
        // console.log(error)
        throw new Error("failed to login!")
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    const user = await db.user.findUnique({
                        where: { email: profile.email },
                    });

                    if (!user) {

                        await db.user.create({
                            data: {
                                username: profile.name,
                                email: profile.email,
                                image: profile.picture,
                            },
                        });
                    }
                } catch (error) {
                    console.log(error)
                    return false;
                }
            }
            return true;
        },
        ...authConfig.callbacks,
    }
});
