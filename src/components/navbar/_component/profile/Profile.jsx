"use client"

import { useState } from 'react';
import styles from './profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Profile = ({session}) => {

    const [active, setActive] = useState(false);

    return (
        <>
            { session && <Image alt='profile' onClick={() => setActive(!active)} className={styles.profilePic} src={session.user.image ? session.user.image : '/noavatar.png'} height={60} width={60} />}

            {active && (<div className={styles.profilePopUp}>
                <Link onClick={() => setActive(false)} href={'/profile'}>Manage Profile</Link>
                <Link onClick={() => setActive(false)} href={'/feedback'}>Feedback</Link>

            </div>)}
        </>
    )
}

export default Profile