
import DashboardPostCard from '../../../components/DashboardPostCard/DashboardPostCard';
import { getPosts } from '../../../lib/action';
import { auth } from '../../../lib/auth';
import styles from './dashboard.module.css';

const Dashboard = async () => {


    const posts = await getPosts();
    const session = await auth();

    console.log(session);
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                {posts.map((post) => (
                    post.username === session.user.name && (<div className={styles.post} key={post.id}>
                        <DashboardPostCard 
                            image={post.image}
                            title={post.title}
                            description={post.description}
                            id={post.id}
                        />
                    </div>)
                ))}
            </div>
        </div>
    )
}

export default Dashboard