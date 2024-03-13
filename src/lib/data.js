// import { unstable_noStore } from "next/cache";
import { getUserbyUsername } from "./userService";


export const getUser = async (username) => {
    // unstable_noStore();
    try {
        const user = await getUserbyUsername(username);
        return user;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user");
    }
}
