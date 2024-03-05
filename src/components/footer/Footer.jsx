import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.organization}>
                Blogify
            </div>

            <div className={styles.copyright}>
                Blogify&#169; All Rights Reserved
            </div>
        </div>
    )
}

export default Footer