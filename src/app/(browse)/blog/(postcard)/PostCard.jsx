
import Link from "next/link"

import styles from './postcard.module.css';

const PostCard = ({post}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {post.image && <div className={styles.imageContainer}>
                    <img src={post.image} alt="post-image" className={styles.image} />
                </div>}
                <span className={styles.date}>01.01.2024</span>
            </div>

            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.description}>{post.description}</p>
                <Link className={styles.link} href={`/blog/${post._id}`}>Read More</Link>
            </div>
        </div>
    )
}

export default PostCard;