// 'use client'

import styles from './layout.module.css';
import { Loader } from 'lucide-react';

const Loading = () => {
    return (
        <div className={styles.loaderContainer}>
            <Loader strokeWidth={1.5} width={60} height={60} />
        </div>
    )
}

export default Loading