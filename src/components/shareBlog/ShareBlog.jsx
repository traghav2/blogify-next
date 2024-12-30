"use client"

import { useState } from 'react';
import styles from './shareblog.module.css';
import { Check, LucideShare2 } from "lucide-react";

const ShareBlog = () => {

    const [clicked, setClicked] = useState(false);

    async function handleClick() {
        setClicked(!clicked)
        await navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
            setClicked(false); 
        }, 5000);
    };

    return (
        <>
            <button disabled={clicked} onClick={handleClick} className={styles.shareButton}>
                <p>{clicked ? 'Link Copied' : 'Share'}</p>
                {clicked ? <Check /> : <LucideShare2 />}
            </button>
        </>
    )
}

export default ShareBlog