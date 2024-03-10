import Image from 'next/image';
import styles from './layout.module.css';

export default function PageLayout({ children }) {
    return (
        <div className={styles.container}>
            <video
                autoPlay
                loop
                muted
                className={styles.videoFile}// Adjust styles as needed
            >
                <source src="/video.mp4" type="video/mp4" />
                {/* Add fallback content for browsers that don't support video */}
                Your browser does not support HTML5 video.
            </video>
            {children}
        </div>
    )
}