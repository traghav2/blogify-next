import styles from "./postuser.module.css";
import { getUser } from "../../lib/data.js";
import Image from "next/image.js";

const PostUser = async ({ userName }) => {

    const user = await getUser(userName);
    // console.log(user);

    return (
        <div className={styles.container}>
            <Image className={styles.image} src={user?.image ? user.image : `/noavatar.png`} alt='profile-pic'
                width={50} height={50} />

            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user?.username}</span>
            </div>
        </div>
    );
}

export default PostUser;