import { createPost } from '../../../lib/action';
import styles from './create.module.css';


const CreatePage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src="/contact.png" alt='contact' fill="true" className={styles.img} />
            </div>

            <div className={styles.formContainer}>
                <form action={createPost} className={styles.form}>
                    <input name='imageUrl' type="text" placeholder='Image Url' />
                    <input name='blogTitle' type="text" placeholder='Title' />
                    <textarea name="blogDescription" id="" cols="30" rows="10" placeholder='Description'></textarea>
                    <button>Publish</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage;