import PostCard from './(postcard)/PostCard'; 
import styles from './blog.module.css';
import { getPosts } from '../../../lib/action';
import SearchBlog from '../../../components/searchBlog/SearchBlog';


const BlogPage = async () => {

    const posts = await getPosts();
    const postCount = posts?.length;

    return (
        <div className={postCount < 1 ? styles.noBlogContainer : styles.container}>
            <SearchBlog
                posts={posts}
                count={postCount}
            />
        </div>
    )
}

export default BlogPage