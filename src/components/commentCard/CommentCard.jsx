"use client"

import Image from "next/image";
import styles from './commentcard.module.css';
import { useState } from "react";
import { deleteComment, replyCommentPost } from "../../lib/action";
import ReplyCard from '../replycard/ReplyCard';
import { usePathname } from "next/navigation";
import { Trash2 } from 'lucide-react'

const CommentCard = ({ replies, sessionUserImage,sessionUserName, commentId, comment, likes, dislikes, username, formattedDate, image }) => {
    const [toggle, setToggle] = useState(false);
    const replyArray = JSON.parse(replies);
    const [state, setState] = useState("");
    const pathname = usePathname();

    async function handleReplySubmit() {
        const comment = await replyCommentPost(sessionUserName, pathname, commentId, state, (sessionUserImage || '/noavatar.png'));
        console.log(comment);
        setState("");
    }

    function handleOnChange(e) {
        setState(e.target.value);
    }
    return (

        <div className={styles.container}>
            <div className={styles.replyContainer}>
                <div className={styles.profile}>
                    <Image className={styles.profilePic} alt="profile-pic" src={image || `/noavatar.png`} width={40} height={40} />
                    <p className={styles.username}>{username}</p>
                    <p className={styles.date}>{formattedDate}</p>
                </div>

                {sessionUserName && <div className={styles.reply}>
                    <p onClick={() => setToggle(!toggle)} className={styles.replyToggle}>Reply</p>
                </div>}
            </div>
            <div className={styles.content}>
                <p className={styles.comment}>{comment}</p>
                <Trash2 onClick={() => deleteComment(pathname,commentId)} className={username === sessionUserName? styles.trash : styles.disabled} height={20} width={20} />
            </div>

            {toggle && (
                <div className={styles.replyCommentsContainer}>
                    <div className={styles.replyComments}>
                        {replyArray.map((reply) => {
                            return (
                                <ReplyCard
                                    createdAt={reply.createdAt.toString()}
                                    username={reply.username}
                                    image={reply.displayPic}
                                    comment={reply.comment}
                                    key={reply._id.toString()}
                                />
                            )
                        })}
                    </div>
                    <div className={styles.replyForm}>
                        <Image className={styles.replyUserImage} alt="reply-user-image" src={sessionUserImage || '/noavatar.png'} height={30} width={30} />

                        <input onChange={handleOnChange} type="text" value={state} placeholder="Add your Reply" className={styles.input} />
                        <button onClick={handleReplySubmit} className={styles.submitButton}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommentCard;