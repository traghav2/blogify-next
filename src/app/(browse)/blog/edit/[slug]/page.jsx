import { auth } from '../../../../../lib/auth';
import { getPost } from '../../../../../lib/action';
import styles from './singlepost.module.css'
import BlogEditForm from '../../../../../components/blogEditForm/BlogEditForm';


export const generateMetadata = async ({ params }) => {
    const post = await getPost(params.slug);

    return {
        title: post.title,
        description: post.description,
    }
}


const EditPostPage = async ({ params }) => {
    const session = await auth();
    const post = await getPost(params.slug);

    return (
        <div className={styles.container}>
            <BlogEditForm 
                image = {post.image}
                title = {post.title}
                description = {post.description}
                _id = {post.id.toString()}
            />
        </div>
    )
}

export default EditPostPage;