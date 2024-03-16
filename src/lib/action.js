"use server";

import { auth, signIn, signOut } from "../lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getUserbyUsername } from "../lib/userService";
import { db } from "./db";

export const handleGoogleLogin = async () => {
    await signIn("google");
};

export const handleLogout = async () => {
    await signOut();
};

export const register = async (previousState, formdata) => {
    const { username, email, password, confirmPassword } =
        Object.fromEntries(formdata);

    if (password !== confirmPassword) {
        return { error: "Passwords do not match!" };
    }

    try {
        const user = await getUserbyUsername(username);

        if (user) {
            return { error: "User already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};

export const login = async (previousState, formdata) => {
    const { username, password } = Object.fromEntries(formdata);

    try {
        await signIn("credentials", { username, password });
    } catch (error) {
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid Username or Password" };
        }
    } finally {
        revalidatePath("/login");
    }
};

export const getPosts = async () => {
    try {
        const posts = db.post.findMany();
        if (posts) {
            return posts;
        }
    } catch (error) {
        console.log(error);
    }

}

export const getPost = async (slug) => {
    try {
        const post = await db.post.findUnique({
            where: { id: slug }, // Assuming 'slug' is a unique field in your Post model
        });


        if (post) {
            return post;
        }
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (formdata) => {
    try {
        const { imageUrl, blogTitle, blogDescription } = Object.fromEntries(formdata);
        const session = await auth();

        if (session.user) {
            await db.post.create({
                data: {
                    image: imageUrl,
                    title: blogTitle,
                    description: blogDescription,
                    username: session.user.name,
                },
            });
            revalidatePath("/blog");
        }

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (id, description) => {
    try {
        await db.post.update({
            where: { id },
            data: {
                description,
            },
        });
        return { status: "success" };

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (id) => {
    try {
        await db.post.delete({
            where: { id },
        });
        revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = async (comment) => {

}
