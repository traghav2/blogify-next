import Image from 'next/image';
import styles from './home.module.css';
import Link from 'next/link';
import { run } from '../../../lib/ai';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Welcome to <span className={styles.homeTitle}>Blogify</span></h1>
        <p className={styles.description}>
        Share your ideas and stories on a beautifully designed platform built for exceptional user experience.
        </p>

        <div className={styles.buttons}>
          <Link className={styles.link} href={'/create'}><button className={styles.button}>Create</button></Link>
          <Link className={styles.link} href='/about'><button className={styles.learnBtn}>Learn More</button></Link>
        </div>

      </div>

      <div className={styles.imageContainer}>
        <Image priority src="/hero.gif" alt='hero-image' height={300} width={400} className={styles.heroImg} />
      </div>
    </div>
  )
};

export default Home;