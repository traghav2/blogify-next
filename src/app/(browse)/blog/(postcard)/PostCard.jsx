
import Link from "next/link"

import styles from './postcard.module.css';
import Image from "next/image";
import moment from "moment";

const PostCard = ({post}) => {
    const shortDescription = post.description.slice(0, 150);
    const mongodate = post.createdAt;
    const date = new Date(mongodate); 
    const formattedDate = moment(date).format('DD/MM/YYYY')

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {post.image && <div className={styles.imageContainer}>
                    <Image src={post.image} alt="post-image" className={styles.image} height={400} width={300} />
                </div>}
                <span className={styles.date}>{formattedDate}</span>
            </div>

            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.description}>{`${shortDescription}...`}</p>
                <Link className={styles.link} href={`/blog/${post._id}`}>Read More</Link>
            </div>
        </div>
    )
}

export default PostCard;