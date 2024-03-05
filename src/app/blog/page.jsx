import PostCard from '../../components/postcard/Postcard';
import styles from './blog.module.css';
import { connectToDb } from '../../lib/utils';
import { Post } from '../../lib/models';
import { getPosts } from '../../lib/data';


// //FETCH DATA WITH API
// const getData = async () => {
//     const res = await fetch('http://localhost:3000/api/blog');
//     // console.log(res.status);
//     if (res.ok) {
//         return res.json();
//     }
//     throw new Error("Something went Wrong");
// }

const BlogPage = async () => {

    const posts = await getPosts();

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    )
}

export default BlogPage