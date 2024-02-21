import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.organization}>
                Gigadev
            </div>

            <div className={styles.copyright}>
                Giga Creative thoughts agency &#169; All Rights Reserved
            </div>
        </div>
    )
}

export default Footer