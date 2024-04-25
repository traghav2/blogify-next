import Image from 'next/image';
import styles from './replycard.module.css';
const ReplyCard = ({createdAt, username, image, comment }) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes.toString() == '0'){
        minutes = '00'
    }
    return (
        <>
            <div className={styles.container}>
                    <div className={styles.profile}>
                        <Image className={styles.profilePic} alt="profile-pic" src={image || `/noavatar.png`} width={25} height={25} />
                        <p className={styles.username}>{username}</p>
                        <p className={styles.date}>{`${hours}:${minutes}`}</p>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.comment}>{comment}</p>
                        
                    </div>
                </div>
        </>
    )
}

export default ReplyCard;