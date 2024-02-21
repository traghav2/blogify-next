import Link from 'next/link';
import Links from './links/Links';
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className={styles.container}>
                <Link href='/' className={styles.logo}>
                    Logo
                </Link>
            <div>
                <Links />
            </div>
        </div>
    )
}

export default Navbar