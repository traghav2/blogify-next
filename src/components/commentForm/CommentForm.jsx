"use client"

import { useState } from "react"
import { commentPost } from '../../lib/action';
import styles from './commentform.module.css';

const CommentForm = ({postId}) => {

    const [state, setState] = useState("");


    function handleCommentSubmit() {
        commentPost(state, postId);
    }


    return (
        <>
                <p className={styles.heading}>
                    Comments
                </p>

            <form className={styles.form} action={handleCommentSubmit}>
                <input className={styles.input} type='text' placeholder='Enter your Comment!' onChange={(e) => setState(e.target.value)}>

                </input>

                <button type="submit" className={styles.commentButton}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default CommentForm