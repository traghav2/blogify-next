"use server"
import { auth, signIn, signOut } from "../lib/auth";
import { Comment, Feedback, User } from "./models";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";
import { Post } from '../lib/models';
import mongoose from "mongoose";
import moment from "moment";
import { run } from "./ai";

export const handleGoogleLogin = async () => {
    await signIn("google");
}

export const handleLogout = async () => {
    await signOut();
}

export const register = async (previousState, formdata) => {
    const { username, email, password, confirmPassword } = Object.fromEntries(formdata);


    if (password !== confirmPassword) {
        return { error: "Passwords do not match!" };
    }

    try {
        connectToDb();
        const user = await User.findOne({ username });

        if (user) {
            return { error: "User already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();
        return { success: true };
    } catch (error) {
        console.log(error)
        return { error: "Something went wrong" };
    }
}

export const login = async (username, password) => {
    try {
        await signIn("credentials", { username, password });
        return { redirect: true };
    } catch (error) {
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid Username or Password" }
        }
    }
}

export const getPosts = async () => {
    try {
        connectToDb();
        const posts = await Post.find();
        if (posts) {
            return posts;
        }
    } catch (error) {
        console.log(error);
    }

}

export const getPost = async (slug) => {
    try {
        connectToDb();
        const post = await Post.findOne({ _id: slug });

        if (post) {
            return post;
        }
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (formData) => {
    try {
        connectToDb();
        const { imageUrl, blogTitle, blogDescription } = formData;
        const session = await auth();

        if (session.user) {
            const newPost = new Post({
                image: imageUrl,
                title: blogTitle,
                description: blogDescription,
                username: session.user.name,
            })

            await newPost.save();
            revalidatePath("/blog");
            return { redirect: '/blog' };
        }


    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (_id, description) => {
    try {
        connectToDb();
        await Post.updateOne({ _id }, { $set: { description: description } });
        revalidatePath(`/blog/${_id}`);
        return { status: "success" };

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (_id) => {
    try {
        await Post.findByIdAndDelete(_id);
        revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = async (comment, postId) => {
    try {
        connectToDb();
        const session = await auth();

        if (session.user) {
            const newComment = new Comment({
                username: session.user.name,
                comment: comment,
                displayPic: session.user.image,
                postId: postId,
            })

            await newComment.save();
            revalidatePath("/blog");
        }


    } catch (error) {
        console.log(error);
    }
}

export const getComments = async (postId) => {
    try {
        connectToDb();
        const comments = await Comment.find({ postId });
        if (!comments) {
            return "No Comments to Show!";
        }
        return comments;
    } catch (error) {
        console.log(error);
    }
}

export const replyCommentPost = async (username, pathname, commentId, comment, image) => {
    try {
        connectToDb();
        const now = Date.now();
        const formattedDate = moment(now).format('YYYY-MM-DD HH:mm:');

        const id = new mongoose.Types.ObjectId(commentId);
        await Comment.findOneAndUpdate(id, {
            $push: {
                replies: {
                    username: username,
                    comment: comment,
                    displayPic: image,
                    commentId: commentId,
                    createdAt: formattedDate,
                }
            }
        })


        revalidatePath(pathname);
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (pathname, commentId) => {
    try {
        connectToDb();
        await Comment.findByIdAndDelete(commentId);
        revalidatePath(pathname);
    } catch (error) {
        console.log(error);
    }
}

export const generateResponseAI = async (value) => {
    try {
        const response = await run(value);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const sendFeedback = async (feedbackDescription) => {
    const session = await auth();
    try {
        connectToDb();
        if (session.user) {
            const newFeedback = new Feedback({
                username: session.user.name,
                feedback: feedbackDescription,
            })

            await newFeedback.save();
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteAcc = async () => {
    const session = await auth();
    try {
        connectToDb();
        const username = session.user.name;

        await Post.deleteMany({ username });
        await Comment.deleteMany({ username });
        await User.deleteOne({ username });
    } catch (error) {
        console.log(error);
    }
}