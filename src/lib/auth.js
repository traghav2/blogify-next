import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from '../auth.config';

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({username: credentials.username});

        if(!user){
            throw new Error("Wrong Credentials!");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);

        if(!isPasswordCorrect){
            throw new Error('Wrong Credentials');
        }

        return user;
    } catch (error) {
        throw new Error("failed to login!");
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
        async signIn({user, account, profile}){
            if(account.provider === "google"){
                connectToDb();
                try {
                    const user = await User.findOne({email: profile.email});
                    if(!user){
                        const newUser = new User({
                            username: profile.name,
                            email: profile.email,
                            image: profile.picture,
                        });

                        await newUser.save();
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
