"use client"

import Link from "next/link"

import styles from './dashboardpostcard.module.css';
import { deletePost } from '../../lib/action';
import Image from "next/image";
import moment from "moment";

const DashboardPostCard = ({ image, title, description, _id, createdAt }) => {
    const shortDescription = description.slice(0, 150)
    const mongodate = createdAt;
    const date = new Date(mongodate); 
    const formattedDate = moment(date).format('DD/MM/YYYY')


    return (
        <>

            <div className={styles.contentContainer}>
                <div className={styles.top}>
                    {image && <div className={styles.imageContainer}>
                        <Image src={image} alt="post-image" className={styles.image} height={250} width={330} />
                    </div>}
                    <span className={styles.date}>{formattedDate}</span>
                </div>

                <div className={styles.bottom}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{`${shortDescription}...`}</p>
                    <Link className={styles.link} href={`/blog/${_id}`}>Read More</Link>
                </div>

                <div className={styles.buttonContainer}>
                    <Link href={`/blog/edit/${_id}`}><button className={styles.editButton}>Edit</button></Link>
                    <button onClick={() => deletePost(_id)} className={styles.deleteButton}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default DashboardPostCard;