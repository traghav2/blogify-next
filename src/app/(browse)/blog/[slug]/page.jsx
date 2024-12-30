import { getComments, getPost } from '../../../../lib/action';
import styles from './singlepost.module.css'
import PostUser from '../../../../components/postuser/Postuser';
import Image from 'next/image';
import CommentForm from '../../../../components/commentForm/CommentForm';
import CommentCard from '../../../../components/commentCard/CommentCard';
import moment from 'moment';
import { auth } from '../../../../lib/auth';
import Summary from '../../../../components/summaryCard/summary';
import ShareBlog from '../../../../components/shareBlog/ShareBlog';


export const generateMetadata = async ({ params }) => {
    const post = await getPost(params.slug);

    return {
        title: post.title,
        description: post.description,
    }
}


const SinglePostPage = async ({ params }) => {
    const post = await getPost(params.slug);
    const mongodate = post.createdAt;
    const date = new Date(mongodate);
    const formattedDate = moment(date).format('DD.MM.YYYY')
    const comments = await getComments(post._id.toString());
    const session = await auth();

    return (
        <div className={styles.container}>
            <Summary postDescription={post.description} />
            <div className={styles.blogContainer}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src={post.image} alt='blog-image' fill />
                </div>


                <ShareBlog />


                <div className={styles.textContainer}>
                    <div className={styles.title}>{post.title}</div>

                    <div className={styles.detail}>

                        <PostUser userName={post.username} />

                        <div className={styles.detailText}>
                            <span className={styles.detailTitle}>Published</span>
                            <span className={styles.detailValue}>{formattedDate}</span>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {post.description}
                    </div>
                </div>
            </div>

            <div className={styles.commentContainer}>
                <CommentForm session={session} postId={post._id.toString()} />

                <div className={styles.comments}>
                    {comments.map(async (comment) => {
                        const dateTime = new Date(comment.createdAt);
                        const customFormat = "HH:mm";
                        const formattedDate = moment(dateTime).format(customFormat);


                        return (
                            <CommentCard
                                sessionUserImage={session?.user?.image}
                                sessionUserName={session?.user?.name}
                                commentId={comment._id.toString()}
                                replies={JSON.stringify(comment.replies)}
                                formattedDate={formattedDate}
                                comment={comment.comment}
                                image={comment.displayPic}
                                username={comment.username}
                                likes={comment.likes}
                                dislikes={comment.dislikes}
                                createdAt={comment.createdAt}
                                key={comment._id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage