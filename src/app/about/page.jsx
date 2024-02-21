import Image from "next/image"
import styles from './about.module.css'

const AboutPage = () => {
    return (
        <div className={styles.container}>

        <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>About Agency</h2>
            <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better!</h1>
            <p className={styles.description}>
            We don't just think outside the box, we redefine it. At our agency, we're passionate about crafting digital ideas that push boundaries, break conventions, and leave a lasting impact. We believe in bigger concepts that go beyond the ordinary, bolder approaches that challenge the status quo, braver executions that embrace risk and reward, and better.
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