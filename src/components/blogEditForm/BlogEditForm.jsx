"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './blogeditform.module.css';
import { updatePost } from '../../lib/action';
import Image from 'next/image';

const BlogEditForm = ({ image, title, description, _id }) => {

    const [descriptionstate, setDescriptionstate] = useState(description);
    const router = useRouter();

    function handleOnchange(event) {
        setDescriptionstate(event.target.value);
    }

    async function handleUpdatePost(){
        await updatePost(_id, descriptionstate);
        router.push(`/blog/${_id}`);
    }
    return (
        <>
            <div className={styles.blogContainer}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src={image} alt='post-image' fill="true" />
                </div>

                <div className={styles.textContainer}>
                    <div className={styles.title} >{title}</div>

                    <textarea type='textarea' value={descriptionstate} onChange={handleOnchange} className={styles.content}></textarea>
                    <button onClick={handleUpdatePost} className={styles.updateButton}>
                        Update
                    </button>
                </div>

            </div>
        </>
    )
}

export default BlogEditForm