import Links from './links/Links';
import styles from './navbar.module.css';
import { auth } from "../../lib/auth";
import Profile from './_component/profile/Profile';

const Navbar = async () => {

    const session = await auth();
    return (
        <div className={styles.container}>
            <Profile session = {session} />
            <Links session={session} />
        </div>
    )
}

export default Navbar