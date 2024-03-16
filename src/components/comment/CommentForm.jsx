"use client"

import { useState } from "react"
import { commentPost } from '../../lib/action';

const CommentForm = () => {

    const [state, setState] = useState("");


    function handleCommentSubmit() {
        commentPost(state);
    }


    return (
        <>
                <h3>
                    Comments
                </h3>

            <form action={handleCommentSubmit}>
                <input type='text' placeholder='Enter your Comment!' onChange={(e) => setState(e.target.value)}>

                </input>

                <button type="submit" className={styles.commentButton}>
                    Submit
                </button>
            </form>
        </>
    )
}

export default CommentForm