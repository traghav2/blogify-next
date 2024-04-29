"use client"

import { useState } from "react"
import { commentPost } from '../../lib/action';
import styles from './commentform.module.css';


const CommentForm = ({postId, session}) => {

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
                <input className={session ? styles.input : styles.disabled} disabled={!session}  type='text' placeholder={session ? `Enter your Comment!` : `Login First to add a comment!`} onChange={(e) => setState(e.target.value)}>

                </input>

                <button type="submit" disabled={session ? false: true} className={session ? styles.commentButton : styles.buttonDisabled}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default CommentForm