"use client"

import styles from './page.module.css';
import { deleteAcc, handleLogout } from '../../../lib/action';

const Page = () => {
    async function handleDelete(){
        await deleteAcc();
        await handleLogout();
    }
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h1>Delete your Account</h1>
                <p>To permanently erase your blogify account click the button below.</p>
                <button onClick={handleDelete} className={styles.deleteButton}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Page