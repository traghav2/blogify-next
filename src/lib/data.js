import { unstable_noStore } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";

// export const getPosts = async () => {
//     try {
//         connectToDb();
//         const posts = await Post.find();
//         return posts;

//     } catch (err) {
//         console.log(err);
//         throw new Error("Failed to fetch posts");
//     }
// }


export const getUser = async (username) => {
    // unstable_noStore();
    try {
        connectToDb();
        const user = await User.findOne({username});
        return user;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user");
    }
}

export const getUsers = async (id) => {
    try {
        connectToDb();
        const users = await User.find();
        return users;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users");
    }
}