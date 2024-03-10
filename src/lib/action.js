"use server"
import { auth, signIn, signOut } from "../lib/auth";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";
// import { getUser } from "./data";
import { Post } from '../lib/models';
// import { getUser } from "./data";

export const handleGoogleLogin = async () => {
    await signIn("google");
}

export const handleLogout = async () => {
    await signOut();
}

export const register = async (previousState, formdata) => {
    const { username, email, password, confirmPassword } = Object.fromEntries(formdata);


    if (password !== confirmPassword) {
        return {error: "Passwords do not match!"};
    }

    try {
        connectToDb();
        const user = await User.findOne({ username });

        if (user) {
            return {error: "User already exists"};
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })

        await newUser.save();
        return {success: true};
    } catch (error) {
        console.log(error)
        return { error: "Something went wrong" };
    }
}

export const login = async (previousState ,formdata) => {
    const { username, password } = Object.fromEntries(formdata);

    try {
        await signIn("credentials", {username, password});
        
    } catch (error) {
        if(error.message.includes("CredentialsSignin")){
            return {error: "Invalid Username or Password"}
        }
    }finally{
        revalidatePath('/login');
    }
}

export const getPosts = async () => {
    try {
        connectToDb();
        const posts = await Post.find();
        if(posts){
            return posts;
        }
    } catch (error) {
        console.log(error);
    }

}   

export const getPost = async(slug) => {
    try {
        connectToDb();
        const post = await Post.findOne({_id: slug});
    
        if(post){
            return post;
        }
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (formdata) => {
    try {
        connectToDb();
        const {imageUrl, blogTitle, blogDescription} = Object.fromEntries(formdata);
        const session = await auth();
    
            const newPost = new Post({
            image: imageUrl,
            title: blogTitle,
            description: blogDescription,
            username: session.user.name,
        })
    
        await newPost.save();
        revalidatePath("/blog");
    } catch (error) {
        console.log(error)
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