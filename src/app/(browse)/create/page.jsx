"use client";

import Image from 'next/image';
import { createPost } from '../../../lib/action';
import styles from './create.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const CreatePage = () => {

    const [formData, setFormData] = useState({
        imageUrl: '',
        blogTitle: '',
        blogDescription: '',
    });
    const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleCreatePost() {
        const result = await createPost(formData);
        if(result?.redirect){
            router.push(result.redirect);
        }else{
            setError("Something Went Wrong");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src="/contact.png" alt='contact' width={430} height={430} className={styles.img} />
            </div>

            <div className={styles.formContainer}>
                <form action={handleCreatePost} className={styles.form}>
                    <input name='imageUrl' value={formData.imageUrl} type="text" placeholder='Image Url' onChange={handleChange} />
                    <input name='blogTitle' value={formData.blogTitle} type="text" placeholder='Title' onChange={handleChange} />
                    <textarea className={styles.blogdesc} name="blogDescription" value={formData.blogDescription} onChange={handleChange} cols="30" rows="10" placeholder='Description'></textarea>

                    <button>
                        Publish
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage;