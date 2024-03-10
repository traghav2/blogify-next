import Image from 'next/image';
import styles from './home.module.css';
import Link from 'next/link';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Welcome to <span className={styles.homeTitle}>Blogify</span></h1>
        <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className={styles.buttons}>
          <Link className={styles.link} href={'/create'}><button className={styles.button}>Create</button></Link>
          <Link className={styles.link} href='/about'><button className={styles.learnBtn}>Learn More</button></Link>
        </div>

      </div>

      <div className={styles.imageContainer}>
        <Image src="/hero.gif" alt='' fill className={styles.heroImg} />
      </div>
    </div>
  )
};

export default Home;