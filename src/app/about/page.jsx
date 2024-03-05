import Image from "next/image"
import styles from './about.module.css'

const AboutPage = () => {
    return (
        <div className={styles.container}>

        <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>About Us</h2>
            <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better!</h1>
            <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem accusamus aliquam tempora iure illo cumque qui, nesciunt molestiae veniam deleniti excepturi, a facere repudiandae, ipsa tempore quisquam quo! Corrupti, nemo!
            </p>
            <div className={styles.boxes}>
                <div className={styles.box}>
                    <h1>10 K+</h1>
                    <p>Years of Experience</p>
                </div>

                <div className={styles.box}>
                    <h1>10 K+</h1>
                    <p>Years of Experience</p>
                </div>

                <div className={styles.box}>
                    <h1>10 K+</h1>
                    <p>Years of Experience</p>
                </div>
            </div>
        </div>

            <div className={styles.imgContainer}>
                <Image className={styles.image} src='/about.png' alt="" fill />
            </div>
        </div>
    )
}

export default AboutPage