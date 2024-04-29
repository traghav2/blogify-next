import PostCard from './(postcard)/PostCard';``
import styles from './blog.module.css';
import { getPosts } from '../../../lib/action';


const BlogPage = async () => {

    const posts = await getPosts();
    const postCount = posts?.length;

    return (
        <div className={styles.container}>
            {postCount < 1 ? <h1 className={styles.para}>No Blogs Uploaded</h1> : posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    )
}

export default BlogPage