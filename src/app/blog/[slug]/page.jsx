import Image from 'next/image'
import styles from './singlepost.module.css'
import { Post } from '../../../lib/models'
import { connectToDb } from '../../../lib/utils'
import PostUser from '../../../components/postuser/Postuser';


//server action

export const getPost = async (slug) => {
    "use server"
    try {
        connectToDb();
        console.log(slug)
        const post = await Post.findOne({ slug })
        return post;
    } catch (error) {
        console.log(error)
    }
}


export const generateMetadata = async ({ params }) => {
    const post = await getPost(params.slug);
    // console.log(post)

    return {
        title: post.title,
        description: post.description,
    }
}

const SinglePostPage = async ({ params }) => {

    const {slug} = params;
    const post = await getPost(slug);
    console.log(post)

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={post.image} alt='' fill />
            </div>

            <div className={styles.textContainer}>
                <div className={styles.title}>{post.title}</div>

                <div className={styles.detail}>

                    <PostUser userId={post.userId} />

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
    )
}

export default SinglePostPage