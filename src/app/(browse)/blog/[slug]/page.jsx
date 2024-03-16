import { getPost } from '../../../../lib/action';
import styles from './singlepost.module.css'
import PostUser from '../../../../components/postuser/Postuser';


export const generateMetadata = async ({ params }) => {
    const post = await getPost(params.slug);

    return {
        title: post.title,
        description: post.description,
    }
}


const SinglePostPage = async ({ params }) => {
    const post = await getPost(params.slug);

    return (
        <div className={styles.container}>
            <div className={styles.blogContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={post.image} alt='' fill />
                </div>

                <div className={styles.textContainer}>
                    <div className={styles.title}>{post.title}</div>

                    <div className={styles.detail}>

                        <PostUser userName={post.username} />

                        <div className={styles.detailText}>
                            <span className={styles.detailTitle}>Published</span>
                            <span className={styles.detailValue}>01.01.2024</span>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {post.description}
                    </div>
                </div>
            </div>

            <div className={styles.commentContainer}>

            </div>
        </div>
    )
}

export default SinglePostPage