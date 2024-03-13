"use client"

import { useState } from 'react';
import styles from './blogeditform.module.css';
import { updatePost } from '../../lib/action';

const BlogEditForm = ({ image, title, description, id }) => {

    const [descriptionstate, setDescriptionstate] = useState(description);
    const [status, setStatus] = useState(false);

    function handleOnchange(event) {
        setDescriptionstate(event.target.value);
    }

    function handleUpdatePost(){
        const status = updatePost(id, descriptionstate);
        if(status === "success"){
            setStatus(true);
            alert("Post Updated Successfully!");
        }
    }
    return (
        <>
            <div className={styles.blogContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={image} alt='post-image' fill="true" />
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