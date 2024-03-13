import { db } from "./db";

export const getUserbyUsername = async (username) => {
    const user  = await db.user.findUnique({
        where: { username: username },
    })

    return user;
}


export const getUserById = async (id) => {
    const user = await db.user.findUnique({
      where: { id },
    });
  
    return user;
  };