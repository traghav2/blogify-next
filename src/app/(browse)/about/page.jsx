import Image from "next/image"
import styles from './about.module.css'

const AboutPage = () => {
    return (
        <div className={styles.container}>

        <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>About Us</h2>
            <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better!</h1>
            <p className={styles.description}>
            Blogify simplifies blog management with intuitive CRUD functionalities and lightning-fast performance powered by Next.js. Create, read, update, and delete blog posts effortlessly. Publish your ideas with ease! Blogify offers a user-friendly experience for all your blogging needs. Manage your blog content seamlessly.
            </p>
        </div>

            <div className={styles.imgContainer}>
                <Image className={styles.image} src='/about.png' alt="" fill />
            </div>
        </div>
    )
}

export default AboutPage