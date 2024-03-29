"use client"

import Link from "next/link"

import styles from './dashboardpostcard.module.css';
import { deletePost } from '../../lib/action';

const DashboardPostCard = ({ image, title, description, id }) => {



    return (
        <>

            <div className={styles.contentContainer}>
                <div className={styles.top}>
                    {image && <div className={styles.imageContainer}>
                        <img src={image} alt="post-image" className={styles.image} />
                    </div>}
                    <span className={styles.date}>01.01.2024</span>
                </div>

                <div className={styles.bottom}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{description}</p>
                    <Link className={styles.link} href={`/blog/${id}`}>Read More</Link>
                </div>

                <div className={styles.buttonContainer}>
                    <Link href={`/blog/edit/${id}`}><button className={styles.editButton}>Edit</button></Link>
                    <button onClick={() => deletePost(id)} className={styles.deleteButton}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default DashboardPostCard;